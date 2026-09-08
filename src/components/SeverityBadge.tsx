import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Severity, SEVERITY_LABELS } from "../data/types";

const COLORS: Record<Severity, string> = {
  1: "#4CAF50",
  2: "#F5A623",
  3: "#E8590C",
  4: "#C0152F",
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <View style={[styles.badge, { backgroundColor: COLORS[severity] }]}>
      <Text style={styles.text}>{SEVERITY_LABELS[severity]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  text: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
