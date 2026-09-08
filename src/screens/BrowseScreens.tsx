import React, { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BrowseStackParamList } from "../navigation/types";
import {
  getLanguages,
  getRegionsForLanguage,
  getWordsForRegion,
  hasSingleRegion,
} from "../data";
import { WordCard } from "../components/WordCard";
import { getMaxSeverity } from "../lib/settings";
import { Severity } from "../data/types";
import { useAppTheme } from "../ThemeContext";
import { ThemeColors, buildShadow, fonts, radii, spacing } from "../theme";

function ListScreen({
  title,
  items,
  onSelect,
}: {
  title: string;
  items: string[];
  onSelect: (item: string) => void;
}) {
  const { colors, shadow } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, shadow), [colors, shadow]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={items}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.rowText}>{item}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

type LanguagesProps = NativeStackScreenProps<BrowseStackParamList, "Languages">;
export function BrowseLanguagesScreen({ navigation }: LanguagesProps) {
  return (
    <ListScreen
      title="Languages"
      items={getLanguages()}
      onSelect={(language) => {
        if (hasSingleRegion(language)) {
          const [region] = getRegionsForLanguage(language);
          navigation.navigate("Words", { language, region });
        } else {
          navigation.navigate("Regions", { language });
        }
      }}
    />
  );
}

type RegionsProps = NativeStackScreenProps<BrowseStackParamList, "Regions">;
export function BrowseRegionsScreen({ route, navigation }: RegionsProps) {
  const { language } = route.params;
  return (
    <ListScreen
      title={language}
      items={getRegionsForLanguage(language)}
      onSelect={(region) => navigation.navigate("Words", { language, region })}
    />
  );
}

type WordsProps = NativeStackScreenProps<BrowseStackParamList, "Words">;
export function BrowseWordsScreen({ route, navigation }: WordsProps) {
  const { language, region } = route.params;
  const [maxSeverity, setMaxSeverity] = useState<Severity>(4);
  const { colors, shadow } = useAppTheme();
  const styles = useMemo(() => createStyles(colors, shadow), [colors, shadow]);

  useFocusEffect(
    useCallback(() => {
      getMaxSeverity().then(setMaxSeverity);
    }, [])
  );

  const words = getWordsForRegion(language, region).filter((w) => w.severity <= maxSeverity);
  const title = hasSingleRegion(language) ? language : region;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
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
      />
    </SafeAreaView>
  );
}

function createStyles(colors: ThemeColors, shadow: ReturnType<typeof buildShadow>) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    title: {
      fontSize: 26,
      fontFamily: fonts.display,
      color: colors.textPrimary,
      padding: spacing.xl,
      paddingBottom: spacing.sm,
    },
    listContent: { paddingHorizontal: spacing.xl, paddingBottom: 40 },
    row: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
      marginVertical: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      ...shadow.card,
    },
    rowPressed: { backgroundColor: colors.cream },
    rowText: { fontSize: 16, color: colors.textPrimary, fontFamily: fonts.bodySemiBold },
    chevron: { fontSize: 20, color: colors.primary, fontFamily: fonts.bodyBold },
  });
}
