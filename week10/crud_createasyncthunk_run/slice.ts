import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { errorMessage } from '../../src/data/api';
import { postNewPost, putPost, readPosts, removePost, validateNewPost } from '../api';
import type { CrudPostsState, NewPost, Post, PostItem, Week10State } from '../types';

type Config = { state: Week10State; rejectValue: string };
const isBusy = (state: Week10State) =>
  state.crudPosts.status === 'loading' ||
  state.crudPosts.saving ||
  state.crudPosts.deletingId !== null;
export const fetchPosts = createAsyncThunk<Post[], void, Config>(
  'week10/crud/fetchPosts',
  async (_arg, { rejectWithValue, signal }) => {
    try {
      return await readPosts(signal);
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
  },
  { condition: (_arg, { getState }) => !isBusy(getState()) },
);
export const addPost = createAsyncThunk<Post, NewPost, Config>(
  'week10/crud/addPost',
  async (post, { rejectWithValue, signal }) => {
    try {
      return await postNewPost(post, signal);
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
  },
  { condition: (_arg, { getState }) => !isBusy(getState()) },
);
export const updatePost = createAsyncThunk<PostItem, PostItem, Config>(
  'week10/crud/updatePost',
  async (post, { rejectWithValue, signal, getState }) => {
    try {
      const current = getState().crudPosts.items.find((item) => item.key === post.key);
      if (!current) throw new Error('Không tìm thấy bài viết cần sửa.');
      const payload = { id: current.id, ...validateNewPost(post) };
      // Bài POST mới không tồn tại trên JSONPlaceholder: sửa tại máy, không PUT lên id giả.
      const saved = current.origin === 'local' ? payload : await putPost(payload, signal);
      return { ...saved, key: current.key, origin: current.origin };
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
  },
  { condition: (_arg, { getState }) => !isBusy(getState()) },
);
export const deletePost = createAsyncThunk<string, string, Config>(
  'week10/crud/deletePost',
  async (key, { rejectWithValue, signal, getState }) => {
    try {
      const post = getState().crudPosts.items.find((item) => item.key === key);
      if (!post) throw new Error('Không tìm thấy bài viết cần xóa.');
      if (post.origin === 'server') await removePost(post.id, signal);
      return key;
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
  },
  { condition: (_arg, { getState }) => !isBusy(getState()) },
);
const initialState: CrudPostsState = {
  items: [],
  status: 'idle',
  saving: false,
  deletingId: null,
  error: null,
};
const slice = createSlice({
  name: 'week10CrudPosts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.map((post) => ({
          ...post,
          key: `server:${post.id}`,
          origin: 'server',
        }));
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = action.meta.aborted ? 'idle' : 'failed';
        state.error = action.meta.aborted ? null : (action.payload ?? 'Không thể tải bài viết.');
      })
      .addCase(addPost.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.saving = false;
        state.items.unshift({
          ...action.payload,
          key: `created:${action.meta.requestId}`,
          origin: 'local',
        });
      })
      .addCase(addPost.rejected, (state, action) => {
        state.saving = false;
        state.error = action.meta.aborted ? null : (action.payload ?? 'Không thể thêm bài viết.');
      })
      .addCase(updatePost.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.saving = false;
        const index = state.items.findIndex((item) => item.key === action.payload.key);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.saving = false;
        state.error = action.meta.aborted ? null : (action.payload ?? 'Không thể sửa bài viết.');
      })
      .addCase(deletePost.pending, (state, action) => {
        state.deletingId = action.meta.arg;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.deletingId = null;
        state.items = state.items.filter((item) => item.key !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.deletingId = null;
        state.error = action.meta.aborted ? null : (action.payload ?? 'Không thể xóa bài viết.');
      });
  },
});
export default slice.reducer;
