import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { HeaderBrand } from "../components/HeaderBrand";

// Custom header (rather than native-stack's built-in one) so we can add
// paddingTop for the real safe-area top inset ourselves. native-stack's
// default header left content butting up against the Android status bar
// (clock/battery/signal) under edge-to-edge rendering; this fixes it on
// both Android and iOS by never relying on the native header's own inset
// handling in the first place.
export function Header({ navigation, back }: NativeStackHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        {back ? (
          <Pressable onPress={navigation.goBack} hitSlop={12} style={styles.backButton}>
            <Text style={styles.backChevron}>‹</Text>
          </Pressable>
        ) : (
          <View style={styles.backSpacer} />
        )}
        <HeaderBrand />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e2e2e2",
  },
  row: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
  },
  backChevron: {
    fontSize: 30,
    lineHeight: 30,
    color: "#1a1a1a",
    marginTop: -2,
  },
  backSpacer: {
    width: 12,
  },
});
