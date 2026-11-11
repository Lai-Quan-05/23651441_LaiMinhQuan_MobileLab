import { Stack } from 'expo-router';
import Basics from '../../../week1/Basics';
export default function Week1() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 1 · Components & hooks' }} />
      <Basics />
    </>
  );
}
