import React, { useCallback, useMemo, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Share, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, RouteProp } from "@react-navigation/native";
import { WordDetailParams } from "../navigation/types";
import { getWordById } from "../data";
import { SeverityBadge } from "../components/SeverityBadge";
import { isFavorite, toggleFavorite } from "../lib/favorites";
import { useAppTheme } from "../ThemeContext";
import { ThemeColors, buildShadow, buildTypography, fonts, radii, spacing } from "../theme";

type Props = { route: RouteProp<{ WordDetail: WordDetailParams }, "WordDetail"> };

export function WordDetailScreen({ route }: Props) {
  const { wordId } = route.params;
  const word = getWordById(wordId);
  const [favorite, setFavorite] = useState(false);
  const { colors, shadow, typography } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, shadow, typography), [colors, shadow, typography]);

  useFocusEffect(
    useCallback(() => {
      if (word) isFavorite(word.id).then(setFavorite);
    }, [word])
  );

  if (!word) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>This word could not be found.</Text>
      </SafeAreaView>
    );
  }

  const onToggleFavorite = async () => {
    const now = await toggleFavorite(word.id);
    setFavorite(now);
  };

  const onShare = () => {
    Share.share({
      message: `"${word.term}" (${word.language}, ${word.region}) — ${word.meaning}`,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
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
            <Section styles={styles} title="Pronunciation" body={word.pronunciation} />
          ) : null}
          <Section styles={styles} title="Literal meaning" body={word.literalMeaning} />
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
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.xl, paddingBottom: 40 },
    notFound: { padding: spacing.xl, fontSize: 16, color: colors.textSecondary },
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
    term: { fontSize: 30, fontWeight: "800", color: colors.textPrimary },
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
}
