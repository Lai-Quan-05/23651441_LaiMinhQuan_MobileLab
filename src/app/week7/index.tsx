import { Stack } from 'expo-router';
import type { ComponentType } from 'react';
import { NavigationIndependentTree } from '@react-navigation/native';
const App = require('../../../week7/App').default as ComponentType;

export default function Week7Route() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tuần 7 · Bike Shop' }} />
      <NavigationIndependentTree>
        <App />
      </NavigationIndependentTree>
    </>
  );
}
