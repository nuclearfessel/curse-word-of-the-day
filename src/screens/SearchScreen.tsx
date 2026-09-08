import React, { useCallback, useMemo, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { searchWords } from "../lib/searchIndex";
import { WordCard } from "../components/WordCard";
import { getMaxSeverity } from "../lib/settings";
import { Severity } from "../data/types";
import { SearchStackParamList } from "../navigation/types";
import { useAppTheme } from "../ThemeContext";
import { ThemeColors, fonts, radii, spacing } from "../theme";

export function SearchScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<SearchStackParamList>>();
  const [query, setQuery] = useState("");
  const [maxSeverity, setMaxSeverity] = useState<Severity>(4);
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

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
          placeholderTextColor={colors.textMuted}
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

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: { paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing.sm },
    title: {
      fontSize: 26,
      fontFamily: fonts.display,
      color: colors.textPrimary,
      marginBottom: spacing.md,
    },
    // No fontFamily here — the user may type in any script, so the input
    // stays on the system default font rather than the app's Latin body font.
    input: {
      backgroundColor: colors.surface,
      borderRadius: radii.pill,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      fontSize: 16,
      color: colors.textPrimary,
      borderWidth: 1,
      borderColor: colors.border,
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
}
