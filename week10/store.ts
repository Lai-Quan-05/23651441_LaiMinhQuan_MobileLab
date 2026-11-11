import { configureStore } from '@reduxjs/toolkit';
import createPost from './create_async_thunk/slice';
import crudPosts from './crud_createasyncthunk_run/slice';

export const createWeek10Store = () => configureStore({ reducer: { createPost, crudPosts } });
export const week10Store = createWeek10Store();
export type RootState = ReturnType<typeof week10Store.getState>;
export type AppDispatch = typeof week10Store.dispatch;
