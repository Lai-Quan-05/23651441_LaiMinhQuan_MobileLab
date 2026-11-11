import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getTours,
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
