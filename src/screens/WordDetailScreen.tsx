import React, { useCallback, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, Share, StyleSheet, Text } from "react-native";
import { useFocusEffect, RouteProp } from "@react-navigation/native";
import { WordDetailParams } from "../navigation/types";
import { getWordById } from "../data";
import { WordDetailView } from "../components/WordDetailView";
import { isFavorite, toggleFavorite } from "../lib/favorites";
import { useAppTheme } from "../ThemeContext";
import { ThemeColors, spacing } from "../theme";

type Props = { route: RouteProp<{ WordDetail: WordDetailParams }, "WordDetail"> };

export function WordDetailScreen({ route }: Props) {
  const { wordId } = route.params;
  const word = getWordById(wordId);
  const [favorite, setFavorite] = useState(false);
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

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

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    content: { padding: spacing.xl, paddingBottom: 40 },
    notFound: { padding: spacing.xl, fontSize: 16, color: colors.textSecondary },
  });
}
