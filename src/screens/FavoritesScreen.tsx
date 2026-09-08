import React, { useCallback, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getFavoriteIds } from "../lib/favorites";
import { getWordById } from "../data";
import { CurseWord } from "../data/types";
import { WordCard } from "../components/WordCard";
import { FavoritesStackParamList } from "../navigation/types";
import { colors, fonts, spacing } from "../theme";

export function FavoritesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<FavoritesStackParamList>>();
  const [words, setWords] = useState<CurseWord[]>([]);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      getFavoriteIds().then((ids) => {
        if (cancelled) return;
        const found = ids
          .map((id) => getWordById(id))
          .filter((w): w is CurseWord => Boolean(w));
        setWords(found);
      });
      return () => {
        cancelled = true;
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={words}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WordCard
            word={item}
            onPress={() => navigation.navigate("WordDetail", { wordId: item.id })}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No favorites yet — tap the star on any word to save it here.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: {
    fontSize: 26,
    fontFamily: fonts.display,
    color: colors.textPrimary,
    padding: spacing.xl,
    paddingBottom: spacing.sm,
  },
  listContent: { paddingHorizontal: spacing.xl, paddingBottom: 40 },
  emptyText: {
    marginTop: spacing.xxl,
    textAlign: "center",
    color: colors.textSecondary,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: spacing.lg,
  },
});
