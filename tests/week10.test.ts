import assert from 'node:assert/strict';
import test from 'node:test';
import { createWeek10Store } from '../week10/store';
import { addPost as addBasicPost } from '../week10/create_async_thunk/slice';
import {
  addPost,
  deletePost,
  fetchPosts,
  updatePost,
} from '../week10/crud_createasyncthunk_run/slice';
import { parsePost } from '../week10/api';
import type { NewPost, Post } from '../week10/types';

const draft: NewPost = { title: 'Bài tuần 10', body: 'Thực hành createAsyncThunk.', userId: 1 };
const serverPost: Post = { ...draft, id: 1 };
const json = (value: unknown, status = 200) =>
  new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json' } });
const httpError = (error: unknown) => typeof error === 'string' && error.includes('HTTP 500');

test('bài 1 POST unshift kết quả, hai id 101 vẫn có key khác nhau', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async (url, options) => {
      assert.equal(String(url), 'https://jsonplaceholder.typicode.com/posts');
      assert.equal(options?.method, 'POST');
      assert.equal(new Headers(options.headers).get('Content-Type'), 'application/json');
      return json({ ...JSON.parse(String(options.body)), id: 101 }, 201);
    };
    const store = createWeek10Store();
    await store.dispatch(addBasicPost(draft)).unwrap();
    await store.dispatch(addBasicPost({ ...draft, title: 'Bài mới hơn' })).unwrap();
    const state = store.getState().createPost;
    assert.equal(state.status, 'succeeded');
    assert.equal(state.items.length, 2);
    assert.equal(state.items[0]!.title, 'Bài mới hơn');
    assert.equal(state.items[0]!.id, state.items[1]!.id);
    assert.notEqual(state.items[0]!.key, state.items[1]!.key);
    assert.equal(store.getState().crudPosts.items.length, 0);
  } finally {
    globalThis.fetch = original;
  }
});

test('bài 1 chặn form rỗng và giữ error khi API từ chối', async () => {
  const original = globalThis.fetch;
  let calls = 0;
  try {
    globalThis.fetch = async () => {
      calls++;
      return json({ error: 'failed' }, 500);
    };
    const store = createWeek10Store();
    const invalid = await store.dispatch(addBasicPost({ ...draft, title: '  ' }));
    assert.equal(addBasicPost.rejected.match(invalid), true);
    assert.equal(calls, 0);
    await assert.rejects(store.dispatch(addBasicPost(draft)).unwrap(), httpError);
    assert.equal(store.getState().createPost.status, 'failed');
    assert.equal(store.getState().createPost.items.length, 0);
    assert.match(store.getState().createPost.error!, /HTTP 500/);
  } finally {
    globalThis.fetch = original;
  }
});

test('pending và condition ngăn hai POST trùng trong lúc đang gửi', async () => {
  const original = globalThis.fetch;
  let finish!: (response: Response) => void;
  let calls = 0;
  try {
    globalThis.fetch = async () => {
      calls++;
      return new Promise<Response>((resolve) => {
        finish = resolve;
      });
    };
    const store = createWeek10Store();
    const first = store.dispatch(addBasicPost(draft));
    assert.equal(store.getState().createPost.status, 'loading');
    const second = await store.dispatch(addBasicPost(draft));
    assert.equal(addBasicPost.rejected.match(second) && second.meta.condition, true);
    assert.equal(calls, 1);
    finish(json({ ...draft, id: 101 }, 201));
    await first.unwrap();
    assert.equal(store.getState().createPost.items.length, 1);
  } finally {
    globalThis.fetch = original;
  }
});

test('CRUD gọi đủ GET POST PUT DELETE và chỉ cập nhật đúng dòng', async () => {
  const original = globalThis.fetch;
  const methods: string[] = [];
  try {
    globalThis.fetch = async (url, options) => {
      const method = options?.method ?? 'GET';
      methods.push(method);
      if (method === 'GET') {
        assert.ok(String(url).endsWith('?_limit=10'));
        return json([serverPost]);
      }
      if (method === 'POST') return json({ ...draft, id: 101 }, 201);
      assert.ok(String(url).endsWith('/1'));
      if (method === 'PUT') return json(JSON.parse(String(options?.body)));
      return new Response(null, { status: 204 });
    };
    const store = createWeek10Store();
    const loading = store.dispatch(fetchPosts());
    assert.equal(store.getState().crudPosts.status, 'loading');
    await loading.unwrap();
    await store.dispatch(addPost(draft)).unwrap();
    const existing = store.getState().crudPosts.items.find((post) => post.origin === 'server')!;
    await store.dispatch(updatePost({ ...existing, title: 'Đã sửa' })).unwrap();
    assert.equal(
      store.getState().crudPosts.items.find((post) => post.key === existing.key)!.title,
      'Đã sửa',
    );
    await store.dispatch(deletePost(existing.key)).unwrap();
    assert.equal(store.getState().crudPosts.items.length, 1);
    assert.equal(store.getState().crudPosts.items[0]!.origin, 'local');
    assert.deepEqual(methods, ['GET', 'POST', 'PUT', 'DELETE']);
  } finally {
    globalThis.fetch = original;
  }
});

test('CRUD giữ dữ liệu đã tải nếu GET lần sau lỗi', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => json([serverPost]);
    const store = createWeek10Store();
    await store.dispatch(fetchPosts()).unwrap();
    globalThis.fetch = async () => json({}, 500);
    await assert.rejects(store.dispatch(fetchPosts()).unwrap(), httpError);
    assert.equal(store.getState().crudPosts.status, 'failed');
    assert.equal(store.getState().crudPosts.items[0]!.id, 1);
  } finally {
    globalThis.fetch = original;
  }
});

test('bài POST trùng id được sửa/xóa riêng tại máy, không gửi PUT tới id chưa tồn tại', async () => {
  const original = globalThis.fetch;
  const methods: string[] = [];
  try {
    globalThis.fetch = async (_url, options) => {
      methods.push(options?.method ?? 'GET');
      return json({ ...draft, id: 101 }, 201);
    };
    const store = createWeek10Store();
    await store.dispatch(addPost(draft)).unwrap();
    await store.dispatch(addPost(draft)).unwrap();
    const [first, second] = store.getState().crudPosts.items;
    await store.dispatch(updatePost({ ...first!, title: 'Chỉ sửa bài đầu' })).unwrap();
    assert.equal(store.getState().crudPosts.items[1]!.title, draft.title);
    await store.dispatch(deletePost(second!.key)).unwrap();
    assert.equal(store.getState().crudPosts.items.length, 1);
    assert.equal(store.getState().crudPosts.items[0]!.title, 'Chỉ sửa bài đầu');
    assert.deepEqual(methods, ['POST', 'POST']);
  } finally {
    globalThis.fetch = original;
  }
});

test('deletingId chỉ đúng bài đang xóa, lỗi thì mở khóa và giữ bài', async () => {
  const original = globalThis.fetch;
  let finish!: (response: Response) => void;
  let deletes = 0;
  try {
    globalThis.fetch = async (_url, options) => {
      if (options?.method === 'DELETE') {
        deletes++;
        return new Promise<Response>((resolve) => {
          finish = resolve;
        });
      }
      return json([serverPost, { ...serverPost, id: 2 }]);
    };
    const store = createWeek10Store();
    await store.dispatch(fetchPosts()).unwrap();
    const task = store.dispatch(deletePost('server:1'));
    assert.equal(store.getState().crudPosts.deletingId, 'server:1');
    const blocked = await store.dispatch(deletePost('server:2'));
    assert.equal(deletePost.rejected.match(blocked) && blocked.meta.condition, true);
    assert.equal(deletes, 1);
    finish(json({}, 500));
    await assert.rejects(task.unwrap(), httpError);
    assert.equal(store.getState().crudPosts.deletingId, null);
    assert.equal(store.getState().crudPosts.items.length, 2);
  } finally {
    globalThis.fetch = original;
  }
});

test('PUT lỗi giữ nội dung cũ, trả lỗi qua unwrap và mở khóa saving', async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async (_url, options) =>
      options?.method === 'PUT' ? json({}, 500) : json([serverPost]);
    const store = createWeek10Store();
    await store.dispatch(fetchPosts()).unwrap();
    const task = store.dispatch(
      updatePost({ ...store.getState().crudPosts.items[0]!, title: 'Không được ghi nhận' }),
    );
    assert.equal(store.getState().crudPosts.saving, true);
    await assert.rejects(task.unwrap(), httpError);
    assert.equal(store.getState().crudPosts.saving, false);
    assert.equal(store.getState().crudPosts.items[0]!.title, draft.title);
  } finally {
    globalThis.fetch = original;
  }
});

test('schema từ chối bài viết sai cấu trúc và GET có id trùng', async () => {
  assert.throws(() => parsePost({ ...serverPost, title: null }));
  assert.throws(() => parsePost({ ...serverPost, id: -1 }));
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async () => json([serverPost, serverPost]);
    const store = createWeek10Store();
    await assert.rejects(
      store.dispatch(fetchPosts()).unwrap(),
      (error: unknown) => typeof error === 'string' && error.includes('trùng'),
    );
    assert.equal(store.getState().crudPosts.status, 'failed');
    assert.equal(store.getState().crudPosts.items.length, 0);
  } finally {
    globalThis.fetch = original;
  }
});
