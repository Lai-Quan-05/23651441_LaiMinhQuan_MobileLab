import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getTours,
  getMovies,
  buildFavoriteUrl,
  groupTours,
  movieSeed,
  parseMovies,
  parseTours,
  requestJson,
  saveFavorite,
  tourSeed,
} from '../src/data/api';

test('schema chấp nhận seed, chuẩn hóa id số', () => {
  assert.deepEqual(parseMovies(movieSeed), movieSeed);
  assert.deepEqual(parseTours(tourSeed), tourSeed);
  assert.equal(parseMovies([{ ...movieSeed[0], id: 7 }])[0]!.id, '7');
});
test('schema từ chối dữ liệu sai và id trùng sau chuẩn hóa', () => {
  assert.throws(() => parseMovies({ movies: [] }));
  assert.throws(() => parseMovies([{ ...movieSeed[0], rating: 15 }]));
  assert.throws(() =>
    parseMovies([
      { ...movieSeed[0], id: 1 },
      { ...movieSeed[0], id: '1' },
    ]),
  );
  assert.throws(() => parseTours([{ ...tourSeed[0], departure: 'khong-phai-ngay' }]));
  assert.throws(() => parseTours([{ ...tourSeed[0], price: -1 }]));
  assert.throws(() => parseTours([{ ...tourSeed[0], isFavorite: 'true' }]));
  assert.throws(() => parseTours([{ ...tourSeed[0], departure: '2026-02-31' }]));
  assert.throws(() => parseMovies([{ ...movieSeed[0], id: '  ' }]));
  assert.throws(() => parseMovies([{ ...movieSeed[0], title: '  ' }]));
  assert.throws(() => parseMovies([{ ...movieSeed[0], year: -1 }]));
  assert.equal(
    parseTours([{ ...tourSeed[0], departure: '2028-02-29' }])[0]!.departure,
    '2028-02-29',
  );
});

test('URL cập nhật giữ query string và hỗ trợ route Mockaroo có :id.json', () => {
  assert.equal(
    buildFavoriteUrl('https://example.com/tours?filter=all', '7'),
    'https://example.com/tours/7?filter=all',
  );
  assert.equal(
    buildFavoriteUrl(
      'https://example.com/tours',
      'a/b',
      'https://example.com/tours/:id.json?mode=test',
    ),
    'https://example.com/tours/a%2Fb.json?mode=test',
  );
  assert.throws(
    () => buildFavoriteUrl('https://example.com/tours', '1', 'https://example.com/favorite.json'),
    /:id/,
  );
});

test('HTTP 204 thành công không bị coi là lỗi JSON; JSON sai vẫn bị từ chối', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response(null, { status: 204 });
    assert.equal(await requestJson('https://example.com/tours/1', { method: 'PUT' }), null);
    globalThis.fetch = async () => new Response('<html>not JSON</html>', { status: 200 });
    await assert.rejects(requestJson('https://example.com/movies'), /JSON không hợp lệ/);
  } finally {
    globalThis.fetch = original;
  }
});

test('AbortSignal hủy request và dữ liệu mẫu khi rời màn hình', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async (_input, options) =>
      new Promise<Response>((_resolve, reject) => {
        options?.signal?.addEventListener('abort', () => reject(new Error('aborted')), {
          once: true,
        });
      });
    const controller = new AbortController();
    const pending = requestJson('https://example.com/movies', { signal: controller.signal });
    controller.abort();
    await assert.rejects(pending, /đã được hủy/);
    await assert.rejects(getMovies(controller.signal), /đã được hủy/);
  } finally {
    globalThis.fetch = original;
  }
});
test('nhóm tour theo thành phố, không mất bản ghi hay sửa đầu vào', () => {
  const source = tourSeed.map((tour) => ({ ...tour }));
  const sections = groupTours(source);
  assert.equal(sections.length, 3);
  assert.equal(sections[0]!.title, 'Đà Lạt');
  assert.equal(
    sections.reduce((sum, section) => sum + section.data.length, 0),
    source.length,
  );
  assert.deepEqual(source, tourSeed);
  assert.deepEqual(groupTours([]), []);
});
test('lỗi cập nhật mô phỏng không sửa nguồn, cập nhật thành công chỉ đổi tour đích', async () => {
  const before = await getTours();
  const target = before[0]!;
  await assert.rejects(saveFavorite(target.id, !target.isFavorite, true), /Lỗi mô phỏng/);
  assert.deepEqual(await getTours(), before);
  await saveFavorite(target.id, !target.isFavorite);
  const after = await getTours();
  assert.equal(after[0]!.isFavorite, !target.isFavorite);
  assert.deepEqual(after.slice(1), before.slice(1));
  await saveFavorite(target.id, target.isFavorite);
});
test('HTTP lỗi được báo rõ thay vì coi là thành công', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => new Response('not found', { status: 404 });
    await assert.rejects(requestJson('https://example.com/movies'), /HTTP 404/);
    globalThis.fetch = async () =>
      new Response(JSON.stringify(movieSeed), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    assert.deepEqual(await requestJson('https://example.com/movies'), movieSeed);
  } finally {
    globalThis.fetch = original;
  }
});
