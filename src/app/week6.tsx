import { Stack } from 'expo-router';
import Movies from '../weeks/week6/Movies';
export default function Week6() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 6 · Movie App' }} />
      <Movies />
    </>
  );
}
