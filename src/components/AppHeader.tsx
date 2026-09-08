import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export function AppHeader() {
  return (
    <View style={styles.row}>
      <Image source={require("../../assets/icon.png")} style={styles.logo} />
      <Text style={styles.title}>Curse Word of the Day</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  logo: {
    width: 34,
    height: 34,
    borderRadius: 9,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a1a1a",
  },
});
