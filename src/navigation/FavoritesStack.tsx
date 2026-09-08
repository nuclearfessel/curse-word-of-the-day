import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoritesStackParamList } from "./types";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { WordDetailScreen } from "../screens/WordDetailScreen";
import { brandedScreenOptions } from "./screenOptions";

const Stack = createNativeStackNavigator<FavoritesStackParamList>();

export function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={brandedScreenOptions}>
      <Stack.Screen name="FavoritesHome" component={FavoritesScreen} />
      <Stack.Screen name="WordDetail" component={WordDetailScreen} />
    </Stack.Navigator>
  );
}
