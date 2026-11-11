import { Stack } from 'expo-router';
import type { ComponentType } from 'react';
const App = require('../../../week6/App').default as ComponentType;

export default function Week6Route() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 6 · Movie App' }} />
      <App />
    </>
  );
}
