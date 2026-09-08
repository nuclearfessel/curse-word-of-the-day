import React, { useCallback, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text } from "react-native";
import { useFocusEffect, useNavigation, NavigationProp } from "@react-navigation/native";
import { getFavoriteIds } from "../lib/favorites";
import { getWordById } from "../data";
import { CurseWord } from "../data/types";
import { WordCard } from "../components/WordCard";
import { AppParamList } from "../navigation/types";

export function FavoritesScreen() {
  const navigation = useNavigation<NavigationProp<AppParamList>>();
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
  container: { flex: 1, backgroundColor: "#f6f6f8" },
  title: { fontSize: 26, fontWeight: "800", color: "#1a1a1a", padding: 20, paddingBottom: 8 },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  emptyText: {
    marginTop: 24,
    textAlign: "center",
    color: "#888",
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
});
