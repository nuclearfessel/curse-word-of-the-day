import React, { useCallback, useState } from "react";
import { Pressable, SafeAreaView, ScrollView, Share, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, RouteProp } from "@react-navigation/native";
import { WordDetailParams } from "../navigation/types";
import { getWordById } from "../data";
import { SeverityBadge } from "../components/SeverityBadge";
import { isFavorite, toggleFavorite } from "../lib/favorites";

type Props = { route: RouteProp<{ WordDetail: WordDetailParams }, "WordDetail"> };

export function WordDetailScreen({ route }: Props) {
  const { wordId } = route.params;
  const word = getWordById(wordId);
  const [favorite, setFavorite] = useState(false);

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
  notFound: { padding: 20, fontSize: 16, color: "#555" },
  term: { fontSize: 30, fontWeight: "800", color: "#1a1a1a" },
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
