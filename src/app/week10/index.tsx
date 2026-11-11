import { Stack } from 'expo-router';
import Week10 from '../../../week10/Week10';

export default function Week10Route() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 10 · createAsyncThunk' }} />
      <Week10 />
    </>
  );
}
