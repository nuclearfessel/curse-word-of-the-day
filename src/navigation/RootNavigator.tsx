import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { TabNavigator } from "./TabNavigator";
import { WordDetailScreen } from "../screens/WordDetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="WordDetail"
        component={WordDetailScreen}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
}
