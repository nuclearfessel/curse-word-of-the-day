// Shared design tokens, derived from the app icon's palette (crimson/plum/gold)
// so the UI actually matches its own branding instead of generic black/gray.

export const colors = {
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
} as const;

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

export const shadow = {
  card: {
    shadowColor: colors.primaryDeep,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
} as const;

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

export const typography = {
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
