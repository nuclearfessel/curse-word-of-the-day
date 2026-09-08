import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { HeaderBrand } from "../components/HeaderBrand";
import { ChevronLeftIcon } from "../components/icons";
import { colors, radii, spacing } from "../theme";

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
          <Pressable
            onPress={navigation.goBack}
            hitSlop={12}
            style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
          >
            <ChevronLeftIcon color={colors.primary} size={22} />
          </Pressable>
        ) : (
          <View style={styles.backSpacer} />
        )}
        <HeaderBrand />
      </View>
      <View style={styles.accentLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
  },
  row: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: radii.pill,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.xs,
    backgroundColor: colors.cream,
  },
  backButtonPressed: {
    backgroundColor: colors.border,
  },
  backSpacer: {
    width: 14,
  },
  accentLine: {
    height: 3,
    backgroundColor: colors.primary,
  },
});
