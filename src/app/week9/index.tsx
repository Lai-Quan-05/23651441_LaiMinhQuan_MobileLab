import { Stack } from 'expo-router';
import type { ComponentType } from 'react';
import { NavigationIndependentTree } from '@react-navigation/native';
const App = require('../../../week9/App').default as ComponentType;

export default function Week9Route() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 9 · Redux Toolkit' }} />
      <NavigationIndependentTree>
        <App />
      </NavigationIndependentTree>
    </>
  );
}
