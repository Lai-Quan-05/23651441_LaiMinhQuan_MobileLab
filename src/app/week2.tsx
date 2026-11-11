import { Stack } from 'expo-router';
import Bookstore from '../weeks/bookstore/Bookstore';
export default function Week2() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 2 · Bố cục nhà sách' }} />
      <Bookstore interactive={false} />
    </>
  );
}
