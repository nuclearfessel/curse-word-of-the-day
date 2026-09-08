import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchStackParamList } from "./types";
import { SearchScreen } from "../screens/SearchScreen";
import { WordDetailScreen } from "../screens/WordDetailScreen";
import { brandedScreenOptions } from "./screenOptions";

const Stack = createNativeStackNavigator<SearchStackParamList>();

export function SearchStack() {
  return (
    <Stack.Navigator screenOptions={brandedScreenOptions}>
      <Stack.Screen name="SearchHome" component={SearchScreen} />
      <Stack.Screen name="WordDetail" component={WordDetailScreen} />
    </Stack.Navigator>
  );
}
