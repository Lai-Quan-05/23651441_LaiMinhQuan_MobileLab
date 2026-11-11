import { Stack } from 'expo-router';
import Bookstore from '../../../week3/Bookstore';
export default function Week3() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 3 · Danh mục sách' }} />
      <Bookstore />
    </>
  );
}
