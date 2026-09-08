import React from "react";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { HeaderBrand } from "../components/HeaderBrand";

// Shared across every per-tab stack so the branded header stays visible
// (native-stack headers don't scroll) on every screen, including pushed
// detail screens that show a back button.
export const brandedScreenOptions: NativeStackNavigationOptions = {
  headerTitle: () => <HeaderBrand />,
  headerTitleAlign: "left",
  headerStyle: { backgroundColor: "#ffffff" },
  headerShadowVisible: true,
};
