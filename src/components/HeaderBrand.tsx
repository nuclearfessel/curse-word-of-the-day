import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../ThemeContext";
import { ThemeColors, fonts } from "../theme";

export function HeaderBrand() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.row}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
      <Text style={styles.title} numberOfLines={1}>
        Curse Word of the Day
      </Text>
    </View>
  );
}

function createStyles(colors: ThemeColors) {
  return StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    logo: {
      width: 28,
      height: 28,
      borderRadius: 7,
      marginRight: 8,
    },
    title: {
      fontSize: 17,
      fontFamily: fonts.heading,
      color: colors.textPrimary,
    },
  });
}
