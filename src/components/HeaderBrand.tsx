import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export function HeaderBrand() {
  return (
    <View style={styles.row}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
      <Text style={styles.title} numberOfLines={1}>
        Curse Word of the Day
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontWeight: "800",
    color: "#1a1a1a",
  },
});
