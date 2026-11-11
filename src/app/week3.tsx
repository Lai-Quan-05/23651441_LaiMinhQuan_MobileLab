import { Stack } from 'expo-router';
import Bookstore from '../weeks/bookstore/Bookstore';
export default function Week3() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 3 · Danh mục sách' }} />
      <Bookstore interactive />
    </>
  );
}
