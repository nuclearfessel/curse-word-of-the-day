import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import {
  buildShadow,
  buildTypography,
  darkColors,
  fonts,
  lightColors,
  radii,
  spacing,
  ResolvedScheme,
  ThemeColors,
  ThemeMode,
} from "./theme";
import { getThemeMode, setThemeMode as persistThemeMode } from "./lib/settings";

type ThemeContextValue = {
  mode: ThemeMode;
  resolvedScheme: ResolvedScheme;
  colors: ThemeColors;
  shadow: ReturnType<typeof buildShadow>;
  typography: ReturnType<typeof buildTypography>;
  radii: typeof radii;
  spacing: typeof spacing;
  fonts: typeof fonts;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    getThemeMode().then(setModeState);
  }, []);

  const setMode = (next: ThemeMode) => {
    setModeState(next);
    persistThemeMode(next);
  };

  const resolvedScheme: ResolvedScheme =
    mode === "system" ? (systemScheme === "dark" ? "dark" : "light") : mode;
  const isDark = resolvedScheme === "dark";
  const colors = isDark ? darkColors : lightColors;

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      resolvedScheme,
      colors,
      shadow: buildShadow(colors, isDark),
      typography: buildTypography(colors),
      radii,
      spacing,
      fonts,
      setMode,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode, resolvedScheme, colors, isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useAppTheme must be used within a ThemeProvider");
  }
  return ctx;
}
