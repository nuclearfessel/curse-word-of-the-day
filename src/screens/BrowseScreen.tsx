import React, { useCallback, useState } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation, NavigationProp } from "@react-navigation/native";
import {
  getWorldAreas,
  getLanguagesInArea,
  getRegionsForLanguage,
  getWordsForRegion,
} from "../data";
import { WordCard } from "../components/WordCard";
import { getMaxSeverity } from "../lib/settings";
import { Severity } from "../data/types";
import { AppParamList } from "../navigation/types";

type Level =
  | { step: "areas" }
  | { step: "languages"; worldArea: string }
  | { step: "regions"; worldArea: string; language: string }
  | { step: "words"; worldArea: string; language: string; region: string };

export function BrowseScreen() {
  const navigation = useNavigation<NavigationProp<AppParamList>>();
  const [level, setLevel] = useState<Level>({ step: "areas" });
  const [maxSeverity, setMaxSeverity] = useState<Severity>(4);

  useFocusEffect(
    useCallback(() => {
      getMaxSeverity().then(setMaxSeverity);
    }, [])
  );

  const goBack = () => {
    if (level.step === "words") {
      setLevel({ step: "regions", worldArea: level.worldArea, language: level.language });
    } else if (level.step === "regions") {
      setLevel({ step: "languages", worldArea: level.worldArea });
    } else if (level.step === "languages") {
      setLevel({ step: "areas" });
    }
  };

  let title = "Browse";
  let items: string[] = [];

  if (level.step === "areas") {
    title = "World regions";
    items = getWorldAreas();
  } else if (level.step === "languages") {
    title = level.worldArea;
    items = getLanguagesInArea(level.worldArea);
  } else if (level.step === "regions") {
    title = level.language;
    items = getRegionsForLanguage(level.worldArea, level.language);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {level.step !== "areas" ? (
          <Pressable onPress={goBack} hitSlop={8}>
            <Text style={styles.backButton}>← Back</Text>
          </Pressable>
        ) : (
          <View style={{ height: 20 }} />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      {level.step === "words" ? (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={getWordsForRegion(level.worldArea, level.language, level.region).filter(
            (w) => w.severity <= maxSeverity
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WordCard
              word={item}
              onPress={() => navigation.navigate("WordDetail", { wordId: item.id })}
            />
          )}
        />
      ) : (
        <FlatList
          contentContainerStyle={styles.listContent}
          data={items}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              style={styles.row}
              onPress={() => {
                if (level.step === "areas") {
                  setLevel({ step: "languages", worldArea: item });
                } else if (level.step === "languages") {
                  setLevel({ step: "regions", worldArea: level.worldArea, language: item });
                } else if (level.step === "regions") {
                  setLevel({
                    step: "words",
                    worldArea: level.worldArea,
                    language: level.language,
                    region: item,
                  });
                }
              }}
            >
              <Text style={styles.rowText}>{item}</Text>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f8" },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  backButton: { color: "#1a73e8", fontSize: 15, marginBottom: 8 },
  title: { fontSize: 26, fontWeight: "800", color: "#1a1a1a" },
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
