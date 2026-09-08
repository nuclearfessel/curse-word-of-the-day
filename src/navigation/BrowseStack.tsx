import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BrowseStackParamList } from "./types";
import {
  BrowseWorldAreasScreen,
  BrowseLanguagesScreen,
  BrowseRegionsScreen,
  BrowseWordsScreen,
} from "../screens/BrowseScreens";
import { WordDetailScreen } from "../screens/WordDetailScreen";
import { brandedScreenOptions } from "./screenOptions";

const Stack = createNativeStackNavigator<BrowseStackParamList>();

export function BrowseStack() {
  return (
    <Stack.Navigator screenOptions={brandedScreenOptions}>
      <Stack.Screen name="WorldAreas" component={BrowseWorldAreasScreen} />
      <Stack.Screen name="Languages" component={BrowseLanguagesScreen} />
      <Stack.Screen name="Regions" component={BrowseRegionsScreen} />
      <Stack.Screen name="Words" component={BrowseWordsScreen} />
      <Stack.Screen name="WordDetail" component={WordDetailScreen} />
    </Stack.Navigator>
  );
}
