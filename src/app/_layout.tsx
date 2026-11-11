import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '../components/ui';
import { store } from '../../week9/store';
import { BikeCartProvider } from '../../week7/cart';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <BikeCartProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerTintColor: colors.ink,
              headerStyle: { backgroundColor: '#fff' },
              headerTitleStyle: { fontWeight: '700' },
              title: 'Mobile Lab',
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="week9" options={{ title: 'Tuần 9 · Redux Toolkit' }} />
          </Stack>
        </BikeCartProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
