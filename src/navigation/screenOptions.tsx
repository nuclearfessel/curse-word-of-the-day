import React from "react";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Header } from "./Header";

// Shared across every per-tab stack so the branded header stays visible
// (it doesn't scroll) on every screen, including pushed detail screens
// that show a back button. Uses a fully custom header (see Header.tsx)
// instead of native-stack's built-in one so we can control the top
// safe-area padding ourselves — native-stack's default header left
// content butting up against the Android status bar under edge-to-edge
// rendering.
export const brandedScreenOptions: NativeStackNavigationOptions = {
  header: (props) => <Header {...props} />,
};
