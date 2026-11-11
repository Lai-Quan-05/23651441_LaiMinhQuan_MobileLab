import { Stack } from 'expo-router';
import type { ComponentType } from 'react';
const App = require('../../../week8/App').default as ComponentType;

export default function Week8Route() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 8 · Tour Việt' }} />
      <App />
    </>
  );
}
