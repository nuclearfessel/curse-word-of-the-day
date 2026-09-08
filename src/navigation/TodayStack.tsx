import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TodayStackParamList } from "./types";
import { TodayScreen } from "../screens/TodayScreen";
import { WordDetailScreen } from "../screens/WordDetailScreen";
import { brandedScreenOptions } from "./screenOptions";

const Stack = createNativeStackNavigator<TodayStackParamList>();

export function TodayStack() {
  return (
    <Stack.Navigator screenOptions={brandedScreenOptions}>
      <Stack.Screen name="TodayHome" component={TodayScreen} />
      <Stack.Screen name="WordDetail" component={WordDetailScreen} />
    </Stack.Navigator>
  );
}
