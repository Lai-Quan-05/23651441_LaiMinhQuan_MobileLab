import { Stack } from 'expo-router';
import type { ComponentType } from 'react';
const App = require('../../../week1/src/app/index').default as ComponentType;

export default function Week1Route() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 1 · Components & hooks' }} />
      <App />
    </>
  );
}
