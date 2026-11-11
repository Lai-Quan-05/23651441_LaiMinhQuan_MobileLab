import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Button, Empty, colors, s } from '../../src/components/ui';
import { useAppDispatch, useAppSelector, useMounted } from '../hooks';
import PostCard from '../PostCard';
import PostForm from '../PostForm';
import type { PostItem } from '../types';
import { addPost, deletePost, fetchPosts, updatePost } from './slice';

export default function CrudPostsScreen() {
  const dispatch = useAppDispatch();
  const { items, status, saving, deletingId, error } = useAppSelector((state) => state.crudPosts);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const mounted = useMounted();
  const busy = saving || deletingId !== null || status === 'loading';
  useEffect(() => {
    if (status === 'idle') void dispatch(fetchPosts());
  }, [dispatch, status]);
  const cancelEdit = () => {
    setTitle('');
    setBody('');
    setEditingId(null);
  };
  const startEdit = (post: PostItem) => {
    setEditingId(post.key);
    setTitle(post.title);
    setBody(post.body);
    setNotice('');
  };
  const submit = async () => {
    if (busy || !title.trim() || !body.trim()) return;
    setNotice('');
    try {
      if (editingId !== null) {
        const post = items.find((item) => item.key === editingId);
        if (!post) {
          setNotice('Bài viết không còn trong danh sách. Hãy hủy chỉnh sửa.');
          return;
        }
        await dispatch(updatePost({ ...post, title, body })).unwrap();
      } else {
        await dispatch(addPost({ title, body, userId: 1 })).unwrap();
      }
      if (mounted.current) {
        cancelEdit();
        setNotice(editingId !== null ? 'Đã cập nhật bài viết.' : 'Đã thêm bài viết.');
      }
    } catch {
      // Lỗi được hiển thị từ Redux; không xóa nội dung đang nhập.
    }
  };
  const remove = async (post: PostItem) => {
    if (busy) return;
    setNotice('');
    try {
      await dispatch(deletePost(post.key)).unwrap();
      if (mounted.current) {
        if (editingId === post.key) cancelEdit();
        setNotice('Đã xóa bài viết khỏi danh sách.');
      }
    } catch {
      // Chỉ xóa item sau fulfilled, nên khi API lỗi dữ liệu cũ vẫn còn.
    }
  };
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.key}
      contentContainerStyle={s.content}
      keyboardShouldPersistTaps="handled"
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListHeaderComponent={
        <View style={{ gap: 16, paddingBottom: 16 }}>
          <Text style={s.heading}>Bài 2 · CRUD với createAsyncThunk</Text>
          <Text style={s.muted}>
            GET lấy 10 bài. POST thêm, PUT sửa và DELETE xóa bài có sẵn trên JSONPlaceholder.
          </Text>
          <PostForm
            title={title}
            body={body}
            onTitleChange={setTitle}
            onBodyChange={setBody}
            onSubmit={() => void submit()}
            editing={editingId !== null}
            onCancel={editingId !== null ? cancelEdit : undefined}
            saving={saving}
            locked={busy}
          />
          {error && (
            <Text accessibilityRole="alert" style={s.error}>
              {error}
            </Text>
          )}
          {notice ? (
            <Text accessibilityLiveRegion="polite" style={s.text}>
              {notice}
            </Text>
          ) : null}
          <Button
            title={
              status === 'failed' && !items.length ? 'Thử tải lại danh sách' : 'Tải lại dữ liệu gốc'
            }
            secondary
            disabled={busy || editingId !== null}
            onPress={() => {
              setNotice('');
              void dispatch(fetchPosts());
            }}
          />
          <Text style={s.muted}>
            API không lưu thay đổi thật. Tải lại dữ liệu gốc sẽ đặt lại danh sách. Bài mới từ POST
            được sửa/xóa tại máy vì id mới chưa tồn tại trên API.
          </Text>
          <Text style={s.heading}>Danh sách bài viết ({items.length})</Text>
          {status === 'loading' && (
            <ActivityIndicator accessibilityLabel="Đang tải bài viết" color={colors.teal} />
          )}
        </View>
      }
      ListEmptyComponent={
        status !== 'loading' ? (
          <Empty
            text={
              status === 'failed'
                ? 'Chưa tải được dữ liệu. Kiểm tra kết nối rồi thử lại.'
                : 'Danh sách chưa có bài viết.'
            }
          />
        ) : undefined
      }
      renderItem={({ item }) => (
        <PostCard post={item}>
          {editingId === item.key && (
            <Text style={{ color: colors.teal }}>Đang chỉnh sửa bài này</Text>
          )}
          <View style={s.row}>
            <Button title="Sửa" secondary disabled={busy} onPress={() => startEdit(item)} />
            <Button
              title={deletingId === item.key ? 'Đang xóa...' : 'Xóa'}
              disabled={busy}
              onPress={() => void remove(item)}
            />
          </View>
        </PostCard>
      )}
    />
  );
}
