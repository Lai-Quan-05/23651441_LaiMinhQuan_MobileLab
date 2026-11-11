import { Stack } from 'expo-router';
import type { ComponentType } from 'react';
const App = require('../../../week3/App').default as ComponentType;

export default function Week3Route() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 3 · Nhà sách' }} />
      <App />
    </>
  );
}
