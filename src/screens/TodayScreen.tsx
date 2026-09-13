import React, { useMemo, useState, useCallback } from "react";
import { SafeAreaView, ScrollView, Share, StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getWordOfDay } from "../lib/wordOfDay";
import { WordDetailView } from "../components/WordDetailView";
import { isFavorite, toggleFavorite } from "../lib/favorites";
import { getMaxSeverity } from "../lib/settings";
import { WORDS } from "../data";
import { CurseWord } from "../data/types";
import { useAppTheme } from "../ThemeContext";
import { ThemeColors, buildTypography, spacing } from "../theme";

export function TodayScreen() {
  const [word, setWord] = useState<CurseWord>(() => getWordOfDay());
  const [favorite, setFavorite] = useState(false);
  const { colors, typography } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, typography), [colors, typography]);

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
        <WordDetailView
          word={word}
          favorite={favorite}
          onToggleFavorite={onToggleFavorite}
          onShare={onShare}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors, typography: ReturnType<typeof buildTypography>) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.xl, paddingBottom: 40 },
    label: {
      ...typography.label,
      marginBottom: spacing.sm,
    },
  });
}
