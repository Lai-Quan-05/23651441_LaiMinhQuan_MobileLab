import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { errorMessage } from '../../src/data/api';
import { postNewPost } from '../api';
import type { CreatePostState, NewPost, Post, Week10State } from '../types';

export const addPost = createAsyncThunk<Post, NewPost, { state: Week10State; rejectValue: string }>(
  'week10/createPost/addPost',
  async (newPost, { rejectWithValue, signal }) => {
    try {
      return await postNewPost(newPost, signal);
    } catch (error) {
      return rejectWithValue(errorMessage(error));
    }
  },
  { condition: (_post, { getState }) => getState().createPost.status !== 'loading' },
);
const initialState: CreatePostState = { items: [], status: 'idle', error: null };
const slice = createSlice({
  name: 'week10CreatePost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // JSONPlaceholder có thể trả id 101 nhiều lần; requestId phân biệt các bài trong phiên.
        state.items.unshift({
          ...action.payload,
          key: `created:${action.meta.requestId}`,
          origin: 'local',
        });
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = action.meta.aborted ? 'idle' : 'failed';
        state.error = action.meta.aborted
          ? null
          : (action.payload ?? action.error.message ?? 'Không thể thêm bài viết.');
      });
  },
});
export default slice.reducer;
