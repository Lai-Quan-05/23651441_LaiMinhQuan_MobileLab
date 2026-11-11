import { router } from 'expo-router';
import { Text } from 'react-native';
import { Button, Page, s } from '../components/ui';
export default function NotFound() {
  return (
    <Page>
      <Text style={s.title}>Không tìm thấy màn hình</Text>
      <Button title="Về trang chọn tuần" onPress={() => router.replace('/')} />
    </Page>
  );
}
