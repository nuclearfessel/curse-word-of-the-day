import React, { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CurseWord } from "../data/types";
import { hasSingleRegion } from "../data";
import { SeverityBadge } from "./SeverityBadge";
import { FavoritesIcon } from "./icons";
import { useAppTheme } from "../ThemeContext";
import { ThemeColors, buildShadow, buildTypography, fonts, radii, spacing } from "../theme";

export function WordDetailView({
  word,
  favorite,
  onToggleFavorite,
  onShare,
}: {
  word: CurseWord;
  favorite: boolean;
  onToggleFavorite: () => void;
  onShare: () => void;
}) {
  const { colors, shadow, typography } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, shadow, typography), [colors, shadow, typography]);

  return (
    <>
      <View style={styles.heroCard}>
        <View style={styles.topRow}>
          <Text style={styles.term}>{word.term}</Text>
          <View>
            <SeverityBadge severity={word.severity} />
          </View>
        </View>
        {word.transliteration ? (
          <Text style={styles.transliteration}>{word.transliteration}</Text>
        ) : null}
        <Text style={styles.locale}>
          {hasSingleRegion(word.language) ? word.language : `${word.language} · ${word.region}`}
        </Text>
        {word.pronunciation ? <Text style={styles.pronunciation}>{word.pronunciation}</Text> : null}
        <Text style={styles.translation}>{word.literalMeaning}</Text>
      </View>

      <View style={styles.detailCard}>
        <Section styles={styles} title="Origin" body={word.origin} />
        <Section styles={styles} title="What it really means" body={word.meaning} />
        <Section
          styles={styles}
          title="How it's used"
          body={word.usageNote}
          last={!word.exampleSentence}
        />
        {word.exampleSentence ? (
          <Section styles={styles} title="Example" body={word.exampleSentence} last />
        ) : null}
      </View>

      <View style={styles.actionRow}>
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            styles.actionButtonSecondary,
            pressed && styles.actionButtonSecondaryPressed,
          ]}
          onPress={onToggleFavorite}
        >
          <FavoritesIcon color={colors.textPrimary} filled={favorite} size={16} />
          <Text style={styles.actionButtonSecondaryText}>
            {favorite ? "Favorited" : "Favorite"}
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            styles.actionButtonPrimary,
            pressed && styles.actionButtonPrimaryPressed,
          ]}
          onPress={onShare}
        >
          <Text style={styles.actionButtonPrimaryText}>Share</Text>
        </Pressable>
      </View>
    </>
  );
}

function Section({
  styles,
  title,
  body,
  last,
}: {
  styles: ReturnType<typeof createStyles>;
  title: string;
  body: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.section, last && styles.sectionLast]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionBody}>{body}</Text>
    </View>
  );
}

function createStyles(
  colors: ThemeColors,
  shadow: ReturnType<typeof buildShadow>,
  typography: ReturnType<typeof buildTypography>
) {
  return StyleSheet.create({
    heroCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.xl,
      marginBottom: spacing.lg,
      ...shadow.card,
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: spacing.md,
    },
    // No fontFamily on term/transliteration/pronunciation — they can be in
    // any script, so they stay on the system default font rather than the
    // app's Latin display typeface.
    term: { flex: 1, fontSize: 32, fontWeight: "800", color: colors.textPrimary },
    transliteration: { fontSize: 17, color: colors.textSecondary, marginTop: 4 },
    locale: {
      fontSize: 13,
      fontFamily: fonts.bodyMedium,
      color: colors.textSecondary,
      marginTop: 2,
    },
    pronunciation: { fontSize: 14, color: colors.textMuted, marginTop: spacing.sm },
    translation: {
      fontSize: 17,
      fontFamily: fonts.bodySemiBold,
      color: colors.textPrimary,
      marginTop: 2,
    },
    detailCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.xl,
      marginBottom: spacing.lg,
      ...shadow.card,
    },
    section: { marginBottom: spacing.lg },
    sectionLast: { marginBottom: 0 },
    sectionTitle: {
      ...typography.label,
      marginBottom: spacing.xs,
    },
    sectionBody: {
      fontSize: 15,
      fontFamily: fonts.body,
      color: colors.textPrimary,
      opacity: 0.85,
      lineHeight: 21,
    },
    actionRow: { flexDirection: "row", gap: spacing.md, marginTop: spacing.xs },
    actionButton: {
      flex: 1,
      flexDirection: "row",
      gap: spacing.xs + 2,
      paddingVertical: spacing.md + 2,
      borderRadius: radii.pill,
      alignItems: "center",
      justifyContent: "center",
    },
    actionButtonPrimary: { backgroundColor: colors.primary },
    actionButtonPrimaryPressed: { backgroundColor: colors.primaryDark },
    actionButtonPrimaryText: { color: colors.white, fontFamily: fonts.bodyBold },
    actionButtonSecondary: {
      backgroundColor: colors.cream,
      borderWidth: 1,
      borderColor: colors.border,
    },
    actionButtonSecondaryPressed: { backgroundColor: colors.border },
    actionButtonSecondaryText: { color: colors.textPrimary, fontFamily: fonts.bodyBold },
  });
}
