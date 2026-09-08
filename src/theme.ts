// Shared design tokens, derived from the app icon's palette (crimson/plum/gold)
// so the UI actually matches its own branding instead of generic black/gray.
// Light and dark variants share the same token names so the rest of the app
// never branches on theme itself — see ThemeContext.tsx for how these are
// selected and exposed via useAppTheme().

export type ThemeMode = "light" | "dark" | "system";
export type ResolvedScheme = "light" | "dark";

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryDeep: string;
  accent: string;
  cream: string;
  background: string;
  surface: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  white: string;

  severityMild: string;
  severityModerate: string;
  severityStrong: string;
  severityExtreme: string;
}

export const lightColors: ThemeColors = {
  primary: "#C22A46",
  primaryDark: "#8C1F38",
  primaryDeep: "#5B1233",
  accent: "#F2B705",
  cream: "#FFF7EC",
  background: "#FAF6F4",
  surface: "#FFFFFF",
  border: "#F0E4E8",
  textPrimary: "#241521",
  textSecondary: "#8A7484",
  textMuted: "#B4A3AC",
  white: "#FFFFFF",

  severityMild: "#3FA66B",
  severityModerate: "#E0A419",
  severityStrong: "#E0632F",
  severityExtreme: "#C0152F",
};

export const darkColors: ThemeColors = {
  primary: "#E8577A",
  primaryDark: "#C22A46",
  primaryDeep: "#F6C94A",
  accent: "#F6C94A",
  cream: "#2E2028",
  background: "#181014",
  surface: "#251A20",
  border: "#3B2A32",
  textPrimary: "#F5EAEE",
  textSecondary: "#B79AA8",
  textMuted: "#8A7484",
  white: "#FFFFFF",

  severityMild: "#4CBE7E",
  severityModerate: "#E8B740",
  severityStrong: "#E87A45",
  severityExtreme: "#E1435C",
};

export const radii = {
  sm: 10,
  md: 14,
  lg: 20,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export function buildShadow(colors: ThemeColors, isDark: boolean) {
  return {
    card: {
      shadowColor: isDark ? "#000000" : colors.primaryDeep,
      shadowOpacity: isDark ? 0.4 : 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
  } as const;
}

// Playfair Display (serif) for headers/terms — editorial character that
// suits a word-of-the-day, dictionary-like app. Inter (sans) for everything
// else — clean and highly readable at small sizes.
export const fonts = {
  display: "PlayfairDisplay_800ExtraBold",
  heading: "PlayfairDisplay_700Bold",
  subtitle: "PlayfairDisplay_600SemiBold",
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
} as const;

export function buildTypography(colors: ThemeColors) {
  return {
    display: { fontSize: 34, fontFamily: fonts.display, color: colors.textPrimary },
    title: { fontSize: 26, fontFamily: fonts.display, color: colors.textPrimary },
    subtitle: { fontSize: 17, fontFamily: fonts.heading, color: colors.textPrimary },
    body: { fontSize: 15, fontFamily: fonts.body, color: colors.textPrimary },
    label: {
      fontSize: 12,
      fontFamily: fonts.bodyBold,
      color: colors.textSecondary,
      letterSpacing: 0.8,
      textTransform: "uppercase" as const,
    },
  } as const;
}
