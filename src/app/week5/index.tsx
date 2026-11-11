import { Stack } from 'expo-router';
import type { ComponentType } from 'react';
const App = require('../../../week5/src/app/index').default as ComponentType;

export default function Week5Route() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 5 · Chọn màu điện thoại' }} />
      <App />
    </>
  );
}
