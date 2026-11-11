import { Stack } from 'expo-router';
import Tours from '../../../week8/Tours';
export default function Week8() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 8 · Tour Việt' }} />
      <Tours />
    </>
  );
}
