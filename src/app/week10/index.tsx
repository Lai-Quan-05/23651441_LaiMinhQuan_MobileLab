import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import Week10 from '../../../week10/Week10';
import { week10Store } from '../../../week10/store';

export default function Week10Route() {
  return (
    <Provider store={week10Store}>
      <Stack.Screen options={{ title: 'Tuần 10 · createAsyncThunk' }} />
      <Week10 />
    </Provider>
  );
}
