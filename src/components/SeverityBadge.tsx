import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Severity, SEVERITY_LABELS } from "../data/types";
import { useAppTheme } from "../ThemeContext";
import { ThemeColors, fonts, radii } from "../theme";

export function SeverityBadge({ severity }: { severity: Severity }) {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  const severityColors: Record<Severity, string> = {
    1: colors.severityMild,
    2: colors.severityModerate,
    3: colors.severityStrong,
    4: colors.severityExtreme,
  };

  return (
    <View style={[styles.badge, { backgroundColor: severityColors[severity] }]}>
      <Text style={styles.text}>{SEVERITY_LABELS[severity]}</Text>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
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
}
