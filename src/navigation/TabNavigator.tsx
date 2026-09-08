import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabParamList } from "./types";
import { TodayStack } from "./TodayStack";
import { BrowseStack } from "./BrowseStack";
import { SearchStack } from "./SearchStack";
import { FavoritesStack } from "./FavoritesStack";
import { SettingsStack } from "./SettingsStack";
import {
  TodayIcon,
  BrowseIcon,
  SearchIcon,
  FavoritesIcon,
  SettingsIcon,
} from "../components/icons";
import { useAppTheme } from "../ThemeContext";
import { fonts } from "../theme";

const Tab = createBottomTabNavigator<TabParamList>();

// Content area (icon + label + breathing room) that must stay clear of any
// safe-area inset — verified visually at 50px (height - top/bottom padding).
const TAB_BAR_CONTENT_HEIGHT = 66;
const TAB_BAR_VERTICAL_PADDING = 8;

export function TabNavigator() {
  const insets = useSafeAreaInsets();
  const bottomInset = Math.max(insets.bottom, TAB_BAR_VERTICAL_PADDING);
  const { colors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontFamily: fonts.bodySemiBold },
        tabBarStyle: {
          height: TAB_BAR_CONTENT_HEIGHT + bottomInset,
          paddingTop: TAB_BAR_VERTICAL_PADDING,
          paddingBottom: bottomInset,
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tab.Screen
        name="Today"
        component={TodayStack}
        options={{
          tabBarIcon: ({ color, size }) => <TodayIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Browse"
        component={BrowseStack}
        options={{
          tabBarIcon: ({ color, size }) => <BrowseIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarIcon: ({ color, size }) => <SearchIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesStack}
        options={{
          tabBarIcon: ({ color, size }) => <FavoritesIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          tabBarIcon: ({ color, size }) => <SettingsIcon color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
