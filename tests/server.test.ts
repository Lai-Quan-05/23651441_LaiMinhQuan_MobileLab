import assert from 'node:assert/strict';
import test, { type TestContext } from 'node:test';
import { once } from 'node:events';
import { createMockarooServer } from '../api/server';
import { movieSeed, tourSeed } from '../src/data/api';

const config = {
  apiKey: 'test-key-not-a-real-credential',
  moviesUrl: 'https://my.api.mockaroo.com/mobilelab/movies.json',
  toursUrl: 'https://my.api.mockaroo.com/mobilelab/tours.json',
  favoriteUrl: 'https://my.api.mockaroo.com/mobilelab/tours/:id.json',
};
const json = (value: unknown, status = 200) =>
  new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json' } });
async function start(t: TestContext, fetchImpl: typeof fetch) {
  const server = createMockarooServer({ ...config, fetchImpl });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(async () => {
    server.closeAllConnections();
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  });
  const address = server.address();
  assert.ok(address && typeof address === 'object');
  return `http://127.0.0.1:${address.port}`;
}
function mockFetch(): typeof fetch {
  return async (input, options) => {
    const url = String(input);
    assert.equal(new Headers(options?.headers).get('X-API-Key'), config.apiKey);
    if (options?.method === 'PUT')
      return json({ id: '1', isFavorite: JSON.parse(String(options.body)).isFavorite });
    return json(url.includes('movies') ? movieSeed : tourSeed);
  };
}
test('proxy gọi Mockaroo với key trên server, trả phim và không lộ key', async (t) => {
  const base = await start(t, mockFetch());
  const response = await fetch(`${base}/movies`);
  assert.equal(response.status, 200);
  const text = await response.text();
  assert.deepEqual(JSON.parse(text), movieSeed);
  assert.equal(text.includes(config.apiKey), false);
  const health = await fetch(`${base}/health`).then((response) => response.json());
  assert.equal(health.favoriteStorage, 'memory');
});
test('yêu thích được xác nhận qua Mockaroo và giữ khi GET lại trong cùng phiên server', async (t) => {
  const base = await start(t, mockFetch());
  const response = await fetch(`${base}/tours/1`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isFavorite: false }),
  });
  assert.equal(response.status, 200);
  const tours = await fetch(`${base}/tours`).then((response) => response.json());
  assert.equal(tours[0].isFavorite, false);
  assert.equal(tourSeed[0]!.isFavorite, true);
});
test('body sai, id sai và origin lạ không được cập nhật', async (t) => {
  const base = await start(t, mockFetch());
  const put = (id: string, body: string) =>
    fetch(`${base}/tours/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  assert.equal((await put('1', '{')).status, 400);
  assert.equal((await put('1', '{"isFavorite":"true"}')).status, 400);
  assert.equal((await put('unknown', '{"isFavorite":true}')).status, 404);
  assert.equal(
    (await fetch(`${base}/movies`, { headers: { Origin: 'https://unknown.example' } })).status,
    403,
  );
  const preflight = await fetch(`${base}/tours/1`, {
    method: 'OPTIONS',
    headers: { Origin: 'http://localhost:8081' },
  });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('Access-Control-Allow-Origin'), 'http://localhost:8081');
});
test('lỗi Mockaroo được báo 502 và không lưu yêu thích thất bại', async (t) => {
  const base = await start(t, async (input, options) =>
    options?.method === 'PUT' ? json({ error: 'failed' }, 403) : json(tourSeed),
  );
  const failed = await fetch(`${base}/tours/1`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: '{"isFavorite":false}',
  });
  assert.equal(failed.status, 502);
  const tours = await fetch(`${base}/tours`).then((response) => response.json());
  assert.equal(tours[0].isFavorite, true);
});
test('proxy từ chối thiếu key và URL không thuộc Mockaroo', () => {
  assert.throws(() => createMockarooServer({ ...config, apiKey: '' }), /MOCKAROO_API_KEY/);
  assert.throws(
    () => createMockarooServer({ ...config, moviesUrl: 'https://example.com/movies' }),
    /URL/,
  );
});
