import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Severity, SEVERITY_LABELS } from "../data/types";
import { colors, fonts, radii } from "../theme";

const SEVERITY_COLORS: Record<Severity, string> = {
  1: colors.severityMild,
  2: colors.severityModerate,
  3: colors.severityStrong,
  4: colors.severityExtreme,
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <View style={[styles.badge, { backgroundColor: SEVERITY_COLORS[severity] }]}>
      <Text style={styles.text}>{SEVERITY_LABELS[severity]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radii.pill,
    alignSelf: "flex-start",
  },
  text: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.bodyBold,
    letterSpacing: 0.3,
  },
});
