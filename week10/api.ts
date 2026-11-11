import { requestJson } from '../src/data/api';
import type { NewPost, Post } from './types';

export const POSTS_API = 'https://jsonplaceholder.typicode.com/posts';
const hasText = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;
export function validateNewPost(value: NewPost): NewPost {
  if (!hasText(value.title) || !hasText(value.body))
    throw new Error('Nhập đầy đủ tiêu đề và nội dung.');
  if (value.title.trim().length > 150 || value.body.trim().length > 2000)
    throw new Error('Tiêu đề tối đa 150 ký tự, nội dung tối đa 2000 ký tự.');
  if (!Number.isSafeInteger(value.userId) || value.userId < 1)
    throw new Error('userId không hợp lệ.');
  return { title: value.title.trim(), body: value.body.trim(), userId: value.userId };
}
export function parsePost(value: unknown): Post {
  if (
    !value ||
    typeof value !== 'object' ||
    !('id' in value) ||
    typeof value.id !== 'number' ||
    !Number.isSafeInteger(value.id) ||
    value.id < 1 ||
    !('title' in value) ||
    !hasText(value.title) ||
    !('body' in value) ||
    !hasText(value.body) ||
    !('userId' in value) ||
    typeof value.userId !== 'number' ||
    !Number.isSafeInteger(value.userId) ||
    value.userId < 1
  )
    throw new Error('API trả về bài viết không đúng định dạng.');
  return { id: value.id, title: value.title, body: value.body, userId: value.userId };
}
export async function readPosts(signal?: AbortSignal): Promise<Post[]> {
  const data = await requestJson(`${POSTS_API}?_limit=10`, { signal });
  if (!Array.isArray(data)) throw new Error('API phải trả về một mảng bài viết.');
  const posts = data.map(parsePost);
  if (new Set(posts.map((post) => post.id)).size !== posts.length)
    throw new Error('API trả về id bài viết trùng nhau.');
  return posts;
}
export async function postNewPost(value: NewPost, signal?: AbortSignal): Promise<Post> {
  return parsePost(
    await requestJson(POSTS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validateNewPost(value)),
      signal,
    }),
  );
}
export async function putPost(value: Post, signal?: AbortSignal): Promise<Post> {
  const payload = { id: value.id, ...validateNewPost(value) };
  const result = parsePost(
    await requestJson(`${POSTS_API}/${value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    }),
  );
  if (result.id !== value.id) throw new Error('API xác nhận sai id bài viết.');
  return result;
}
export async function removePost(id: number, signal?: AbortSignal): Promise<void> {
  await requestJson(`${POSTS_API}/${id}`, { method: 'DELETE', signal });
}
