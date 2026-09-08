import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CurseWord } from "../data/types";
import { SeverityBadge } from "./SeverityBadge";

export function WordCard({ word, onPress }: { word: CurseWord; onPress: () => void }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.termBlock}>
          <Text style={styles.term}>{word.term}</Text>
          <Text style={styles.subtitle}>
            {word.language} · {word.region}
          </Text>
        </View>
        <SeverityBadge severity={word.severity} />
      </View>
      <Text style={styles.meaning} numberOfLines={2}>
        {word.meaning}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  termBlock: {
    flex: 1,
    paddingRight: 12,
  },
  term: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  meaning: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
});
