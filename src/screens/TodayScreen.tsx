import React, { useState, useCallback } from "react";
import { SafeAreaView, ScrollView, Share, StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getWordOfDay } from "../lib/wordOfDay";
import { SeverityBadge } from "../components/SeverityBadge";
import { isFavorite, toggleFavorite } from "../lib/favorites";
import { getMaxSeverity } from "../lib/settings";
import { WORDS } from "../data";
import { CurseWord } from "../data/types";
import { colors, fonts, radii, shadow, spacing, typography } from "../theme";

export function TodayScreen() {
  const [word, setWord] = useState<CurseWord>(() => getWordOfDay());
  const [favorite, setFavorite] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getMaxSeverity().then((maxSeverity) => {
        const pool = WORDS.filter((w) => w.severity <= maxSeverity);
        setWord(getWordOfDay(new Date(), pool));
      });
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      isFavorite(word.id).then(setFavorite);
    }, [word.id])
  );

  const onToggleFavorite = async () => {
    const now = await toggleFavorite(word.id);
    setFavorite(now);
  };

  const onShare = () => {
    Share.share({
      message: `Today's word from Curse Word of the Day: "${word.term}" (${word.language}, ${word.region}) — ${word.meaning}`,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>WORD OF THE DAY</Text>

        <View style={styles.heroCard}>
          <Text style={styles.term}>{word.term}</Text>
          {word.transliteration ? (
            <Text style={styles.transliteration}>{word.transliteration}</Text>
          ) : null}
          <Text style={styles.locale}>
            {word.language} · {word.region}
          </Text>
          <View style={styles.badgeRow}>
            <SeverityBadge severity={word.severity} />
          </View>
        </View>

        <View style={styles.detailCard}>
          {word.pronunciation ? (
            <Section title="Pronunciation" body={word.pronunciation} />
          ) : null}
          <Section title="Literal meaning" body={word.literalMeaning} />
          <Section title="Origin" body={word.origin} />
          <Section title="What it really means" body={word.meaning} />
          <Section title="How it's used" body={word.usageNote} last={!word.exampleSentence} />
          {word.exampleSentence ? (
            <Section title="Example" body={word.exampleSentence} last />
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
            <Text style={styles.actionButtonSecondaryText}>
              {favorite ? "★ Favorited" : "☆ Favorite"}
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
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, body, last }: { title: string; body: string; last?: boolean }) {
  return (
    <View style={[styles.section, last && styles.sectionLast]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionBody}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, paddingBottom: 40 },
  label: {
    ...typography.label,
    marginBottom: spacing.sm,
  },
  heroCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    ...shadow.card,
  },
  // No fontFamily on term/transliteration — they can be in any script, so
  // they stay on the system default font rather than the app's Latin
  // display typeface.
  term: { fontSize: 34, fontWeight: "800", color: colors.textPrimary },
  transliteration: { fontSize: 16, color: colors.textSecondary, marginTop: 2 },
  locale: {
    fontSize: 15,
    fontFamily: fonts.bodyMedium,
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: spacing.md,
  },
  badgeRow: {},
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
    paddingVertical: spacing.md + 2,
    borderRadius: radii.pill,
    alignItems: "center",
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
