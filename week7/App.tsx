import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ImageSourcePropType } from "react-native";
import Screen_1 from './components/Screen_1'
import Screen_2 from "./components/Screen_2";
import Screen_3 from "./components/Screen_3";
export interface Bike {
  id: string;
  name: string;
  price: string;
  image: ImageSourcePropType;

};
export type RootStackParamList = {
  Screen_1: undefined;
  Screen_2: undefined;
  Screen_3: { bike?: Bike };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name = "Screen_1" component={Screen_1}/>
        <Stack.Screen name = "Screen_2" component={Screen_2}/>
        <Stack.Screen name = "Screen_3" component={Screen_3}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


