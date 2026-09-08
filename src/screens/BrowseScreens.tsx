import React, { useCallback, useState } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BrowseStackParamList } from "../navigation/types";
import {
  getWorldAreas,
  getLanguagesInArea,
  getRegionsForLanguage,
  getWordsForRegion,
} from "../data";
import { WordCard } from "../components/WordCard";
import { getMaxSeverity } from "../lib/settings";
import { Severity } from "../data/types";

function ListScreen({
  title,
  items,
  onSelect,
}: {
  title: string;
  items: string[];
  onSelect: (item: string) => void;
}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={items}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => onSelect(item)}>
            <Text style={styles.rowText}>{item}</Text>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

type WorldAreasProps = NativeStackScreenProps<BrowseStackParamList, "WorldAreas">;
export function BrowseWorldAreasScreen({ navigation }: WorldAreasProps) {
  return (
    <ListScreen
      title="World regions"
      items={getWorldAreas()}
      onSelect={(worldArea) => navigation.navigate("Languages", { worldArea })}
    />
  );
}

type LanguagesProps = NativeStackScreenProps<BrowseStackParamList, "Languages">;
export function BrowseLanguagesScreen({ route, navigation }: LanguagesProps) {
  const { worldArea } = route.params;
  return (
    <ListScreen
      title={worldArea}
      items={getLanguagesInArea(worldArea)}
      onSelect={(language) => navigation.navigate("Regions", { worldArea, language })}
    />
  );
}

type RegionsProps = NativeStackScreenProps<BrowseStackParamList, "Regions">;
export function BrowseRegionsScreen({ route, navigation }: RegionsProps) {
  const { worldArea, language } = route.params;
  return (
    <ListScreen
      title={language}
      items={getRegionsForLanguage(worldArea, language)}
      onSelect={(region) => navigation.navigate("Words", { worldArea, language, region })}
    />
  );
}

type WordsProps = NativeStackScreenProps<BrowseStackParamList, "Words">;
export function BrowseWordsScreen({ route, navigation }: WordsProps) {
  const { worldArea, language, region } = route.params;
  const [maxSeverity, setMaxSeverity] = useState<Severity>(4);

  useFocusEffect(
    useCallback(() => {
      getMaxSeverity().then(setMaxSeverity);
    }, [])
  );

  const words = getWordsForRegion(worldArea, language, region).filter(
    (w) => w.severity <= maxSeverity
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{region}</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f8" },
  title: { fontSize: 26, fontWeight: "800", color: "#1a1a1a", padding: 20, paddingBottom: 8 },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  row: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowText: { fontSize: 16, color: "#1a1a1a", fontWeight: "600" },
  chevron: { fontSize: 20, color: "#bbb" },
});
