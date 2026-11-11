import { Stack } from 'expo-router';
import Bookstore from '../../../week2/Bookstore';
export default function Week2() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 2 · Bố cục nhà sách' }} />
      <Bookstore />
    </>
  );
}
