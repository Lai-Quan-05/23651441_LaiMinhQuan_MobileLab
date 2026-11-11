import { useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { Empty, colors, s } from '../../src/components/ui';
import { useAppDispatch, useAppSelector, useMounted } from '../hooks';
import PostCard from '../PostCard';
import PostForm from '../PostForm';
import { addPost } from './slice';

export default function CreateAsyncThunkScreen() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.createPost);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [notice, setNotice] = useState('');
  const mounted = useMounted();
  const loading = status === 'loading';
  const submit = async () => {
    if (loading || !title.trim() || !body.trim()) return;
    setNotice('');
    try {
      await dispatch(addPost({ title, body, userId: 1 })).unwrap();
      if (mounted.current) {
        setTitle('');
        setBody('');
        setNotice('Đã thêm bài viết vào đầu danh sách.');
      }
    } catch {
      // Slice giữ thông báo lỗi; giữ nguyên form để người dùng thử lại.
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
          <Text style={s.heading}>Bài 1 · POST với createAsyncThunk</Text>
          <Text style={s.muted}>
            Nhập bài viết, gửi POST lên JSONPlaceholder và nhận kết quả. Dữ liệu được thêm vào đầu
            danh sách bằng unshift.
          </Text>
          <PostForm
            title={title}
            body={body}
            onTitleChange={setTitle}
            onBodyChange={setBody}
            onSubmit={() => void submit()}
            saving={loading}
            locked={loading}
          />
          <Text style={s.muted}>
            Trạng thái:{' '}
            {status === 'loading'
              ? 'pending — đang gửi'
              : status === 'succeeded'
                ? 'fulfilled — thành công'
                : status === 'failed'
                  ? 'rejected — thất bại'
                  : 'idle — sẵn sàng'}
          </Text>
          {loading && <ActivityIndicator color={colors.teal} />}
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
          <Text style={s.muted}>
            JSONPlaceholder mô phỏng POST, không lưu bài viết lâu dài. Mỗi kết quả có key riêng dù
            API trả cùng id 101.
          </Text>
          <Text style={s.heading}>Danh sách bài viết ({items.length})</Text>
        </View>
      }
      ListEmptyComponent={<Empty text="Chưa có bài viết. Thêm một bài để bắt đầu." />}
      renderItem={({ item }) => <PostCard post={item} />}
    />
  );
}
