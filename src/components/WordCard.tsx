import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CurseWord, Severity } from "../data/types";
import { SeverityBadge } from "./SeverityBadge";
import { colors, fonts, radii, shadow, spacing } from "../theme";

const ACCENT_COLORS: Record<Severity, string> = {
  1: colors.severityMild,
  2: colors.severityModerate,
  3: colors.severityStrong,
  4: colors.severityExtreme,
};

export function WordCard({ word, onPress }: { word: CurseWord; onPress: () => void }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={[styles.accent, { backgroundColor: ACCENT_COLORS[word.severity] }]} />
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.termBlock}>
            <Text style={styles.term}>{word.term}</Text>
            <Text style={styles.subtitle}>
              {word.language} · {word.region}
            </Text>
          </View>
          <SeverityBadge severity={word.severity} />
        </View>
        <Text style={styles.meaning} numberOfLines={2}>
          {word.meaning}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    marginVertical: spacing.xs + 2,
    overflow: "hidden",
    ...shadow.card,
  },
  cardPressed: {
    opacity: 0.88,
  },
  accent: {
    width: 5,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  termBlock: {
    flex: 1,
    paddingRight: spacing.md,
  },
  // No fontFamily override here — `term` can be in any script (Arabic,
  // Chinese, Thai, etc.), so it stays on the system default font rather
  // than being forced into the app's Latin display typeface.
  term: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    marginTop: 2,
  },
  meaning: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.textPrimary,
    opacity: 0.75,
    lineHeight: 20,
  },
});
