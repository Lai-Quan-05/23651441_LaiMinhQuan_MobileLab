import { Stack } from 'expo-router';
import type { ComponentType } from 'react';
const App = require('../../../week2/App').default as ComponentType;

export default function Week2Route() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 2 · Nhà sách' }} />
      <App />
    </>
  );
}
