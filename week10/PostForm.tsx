import { Text } from 'react-native';
import { Button, Card, Input, s } from '../src/components/ui';

export default function PostForm({
  title,
  body,
  onTitleChange,
  onBodyChange,
  onSubmit,
  onCancel,
  editing = false,
  saving,
  locked,
}: {
  title: string;
  body: string;
  onTitleChange: (value: string) => void;
  onBodyChange: (value: string) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  editing?: boolean;
  saving: boolean;
  locked: boolean;
}) {
  return (
    <Card>
      <Text style={s.heading}>{editing ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}</Text>
      <Input
        accessibilityLabel="Tiêu đề bài viết"
        placeholder="Nhập tiêu đề"
        value={title}
        onChangeText={onTitleChange}
        maxLength={150}
        editable={!locked}
      />
      <Input
        accessibilityLabel="Nội dung bài viết"
        placeholder="Nhập nội dung"
        value={body}
        onChangeText={onBodyChange}
        maxLength={2000}
        multiline
        editable={!locked}
        style={{ minHeight: 110, textAlignVertical: 'top' }}
      />
      <Button
        title={saving ? 'Đang lưu...' : editing ? 'Cập nhật bài viết' : 'Thêm bài viết'}
        disabled={locked || !title.trim() || !body.trim()}
        onPress={onSubmit}
      />
      {onCancel && <Button title="Hủy chỉnh sửa" secondary disabled={locked} onPress={onCancel} />}
    </Card>
  );
}
