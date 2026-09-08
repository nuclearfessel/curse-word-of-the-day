import React from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

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
          <Pressable style={styles.button} onPress={onAccept}>
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
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 420,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignSelf: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1a1a1a",
    textAlign: "center",
  },
  body: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1a1a1a",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
