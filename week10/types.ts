export type Post = { id: number; title: string; body: string; userId: number };
export type NewPost = Omit<Post, 'id'>;
export type PostItem = Post & { key: string; origin: 'server' | 'local' };
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
export type CreatePostState = { items: PostItem[]; status: RequestStatus; error: string | null };
export type CrudPostsState = {
  items: PostItem[];
  status: RequestStatus;
  saving: boolean;
  deletingId: string | null;
  error: string | null;
};
export type Week10State = { createPost: CreatePostState; crudPosts: CrudPostsState };
