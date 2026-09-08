import React, { useCallback, useMemo, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { searchWords } from "../lib/searchIndex";
import { WordCard } from "../components/WordCard";
import { getMaxSeverity } from "../lib/settings";
import { Severity } from "../data/types";
import { SearchStackParamList } from "../navigation/types";

export function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<SearchStackParamList>>();
  const [query, setQuery] = useState("");
  const [maxSeverity, setMaxSeverity] = useState<Severity>(4);

  useFocusEffect(
    useCallback(() => {
      getMaxSeverity().then(setMaxSeverity);
    }, [])
  );

  const results = useMemo(
    () => searchWords(query).filter((w) => w.severity <= maxSeverity),
    [query, maxSeverity]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <TextInput
          style={styles.input}
          placeholder="Type a word, language, or region…"
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WordCard
            word={item}
            onPress={() => navigation.navigate("WordDetail", { wordId: item.id })}
          />
        )}
        ListEmptyComponent={
          query.trim().length > 0 ? (
            <Text style={styles.emptyText}>No matches for "{query}".</Text>
          ) : (
            <Text style={styles.emptyText}>
              Search by native script (e.g. "操"), a romanized guess, or a language/region
              name.
            </Text>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f8" },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  title: { fontSize: 26, fontWeight: "800", color: "#1a1a1a", marginBottom: 12 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1a1a1a",
  },
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
