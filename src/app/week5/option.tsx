import { Stack } from 'expo-router';
import type { ComponentType } from 'react';
const App = require('../../../week5/src/app/option').default as ComponentType;
export default function OptionRoute() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 5 · Chọn màu' }} />
      <App />
    </>
  );
}
