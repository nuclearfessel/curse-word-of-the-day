import React from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, radii, spacing } from "../theme";

export function DisclaimerModal({
  visible,
  onAccept,
}: {
  visible: boolean;
  onAccept: () => void;
}) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Image source={require("../../assets/icon.png")} style={styles.logo} />
          <Text style={styles.title}>Curse Word of the Day</Text>
          <Text style={styles.body}>
            Curse Word of the Day is a language and culture reference: it explores how
            profanity, slang, and taboo language vary across the world's languages and
            regions — including etymology and real cultural context, not just shock value.
          </Text>
          <Text style={styles.body}>
            The content is explicit by nature. By continuing you confirm you're old enough
            to view mature language content in your country.
          </Text>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={onAccept}
          >
            <Text style={styles.buttonText}>I understand, continue</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(36,21,33,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.xl,
    width: "100%",
    maxWidth: 420,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: radii.md,
    alignSelf: "center",
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.display,
    marginBottom: spacing.md,
    color: colors.textPrimary,
    textAlign: "center",
  },
  body: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.textPrimary,
    opacity: 0.8,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radii.pill,
    paddingVertical: spacing.md + 2,
    alignItems: "center",
    marginTop: spacing.xs,
  },
  buttonPressed: {
    backgroundColor: colors.primaryDark,
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.bodyBold,
    fontSize: 15,
  },
});
