import React, { useState, useCallback } from "react";
import { SafeAreaView, ScrollView, Share, StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";
import { useFocusEffect, useNavigation, NavigationProp } from "@react-navigation/native";
import { getWordOfDay } from "../lib/wordOfDay";
import { SeverityBadge } from "../components/SeverityBadge";
import { isFavorite, toggleFavorite } from "../lib/favorites";
import { getMaxSeverity } from "../lib/settings";
import { WORDS } from "../data";
import { CurseWord } from "../data/types";
import { AppParamList } from "../navigation/types";
import { AppHeader } from "../components/AppHeader";

export function TodayScreen() {
  const navigation = useNavigation<NavigationProp<AppParamList>>();
  const [word, setWord] = useState<CurseWord>(() => getWordOfDay());
  const [favorite, setFavorite] = useState(false);

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
        <AppHeader />
        <Text style={styles.label}>WORD OF THE DAY</Text>
        <Text style={styles.term}>{word.term}</Text>
        {word.transliteration ? (
          <Text style={styles.transliteration}>{word.transliteration}</Text>
        ) : null}
        <Text style={styles.locale}>
          {word.language} · {word.region}
        </Text>

        <View style={styles.badgeRow}>
          <SeverityBadge severity={word.severity} />
        </View>

        {word.pronunciation ? (
          <Section title="Pronunciation" body={word.pronunciation} />
        ) : null}
        <Section title="Literal meaning" body={word.literalMeaning} />
        <Section title="Origin" body={word.origin} />
        <Section title="What it really means" body={word.meaning} />
        <Section title="How it's used" body={word.usageNote} />
        {word.exampleSentence ? (
          <Section title="Example" body={word.exampleSentence} />
        ) : null}

        <View style={styles.actionRow}>
          <Pressable style={styles.actionButton} onPress={onToggleFavorite}>
            <Text style={styles.actionButtonText}>
              {favorite ? "★ Favorited" : "☆ Favorite"}
            </Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={onShare}>
            <Text style={styles.actionButtonText}>Share</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionBody}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f8" },
  content: { padding: 20, paddingBottom: 40 },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#999",
    letterSpacing: 1,
    marginBottom: 6,
  },
  term: { fontSize: 34, fontWeight: "800", color: "#1a1a1a" },
  transliteration: { fontSize: 16, color: "#666", marginTop: 2 },
  locale: { fontSize: 15, color: "#555", marginTop: 6, marginBottom: 12 },
  badgeRow: { marginBottom: 16 },
  section: { marginBottom: 16 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#999",
    letterSpacing: 0.5,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  sectionBody: { fontSize: 15, color: "#333", lineHeight: 21 },
  actionRow: { flexDirection: "row", gap: 12, marginTop: 12 },
  actionButton: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  actionButtonText: { color: "#fff", fontWeight: "700" },
});
