import React, { useCallback, useState } from "react";
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  getMaxSeverity,
  setMaxSeverity as persistMaxSeverity,
  getNotificationsEnabled,
  setNotificationsEnabled as persistNotificationsEnabled,
  getNotificationHour,
  setNotificationHour as persistNotificationHour,
  setDisclaimerSeen,
} from "../lib/settings";
import {
  requestNotificationPermission,
  scheduleDailyReminder,
  cancelDailyReminder,
} from "../lib/notifications";
import { Severity, SEVERITY_LABELS } from "../data/types";

const SEVERITY_OPTIONS: Severity[] = [1, 2, 3, 4];
const HOUR_OPTIONS = [8, 9, 12, 18, 20];

export function SettingsScreen() {
  const [maxSeverity, setMaxSeverityState] = useState<Severity>(4);
  const [notificationsEnabled, setNotificationsEnabledState] = useState(false);
  const [notificationHour, setNotificationHourState] = useState(9);

  useFocusEffect(
    useCallback(() => {
      getMaxSeverity().then(setMaxSeverityState);
      getNotificationsEnabled().then(setNotificationsEnabledState);
      getNotificationHour().then(setNotificationHourState);
    }, [])
  );

  const onSelectSeverity = async (value: Severity) => {
    setMaxSeverityState(value);
    await persistMaxSeverity(value);
  };

  const onToggleNotifications = async (value: boolean) => {
    if (value) {
      const granted = await requestNotificationPermission();
      if (!granted) {
        Alert.alert(
          "Permission needed",
          "Enable notifications for this app in your device settings to get a daily reminder."
        );
        return;
      }
      await scheduleDailyReminder(notificationHour);
    } else {
      await cancelDailyReminder();
    }
    setNotificationsEnabledState(value);
    await persistNotificationsEnabled(value);
  };

  const onSelectHour = async (hour: number) => {
    setNotificationHourState(hour);
    await persistNotificationHour(hour);
    if (notificationsEnabled) {
      await scheduleDailyReminder(hour);
    }
  };

  const onShowDisclaimerAgain = () => {
    Alert.alert(
      "About this app",
      "Curse Word of the Day is a language and culture reference exploring how profanity, slang, and taboo language vary across the world's languages and regions — including etymology and cultural context, not just shock value. Content is explicit by nature; intended for adult users."
    );
  };

  const onResetDisclaimer = () => {
    Alert.alert(
      "Show disclaimer on next launch?",
      "This will show the mature-content notice again the next time you open the app.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await setDisclaimerSeen();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily reminder</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.rowLabel}>Notify me daily</Text>
            <Switch value={notificationsEnabled} onValueChange={onToggleNotifications} />
          </View>
          {notificationsEnabled ? (
            <View style={styles.chipRow}>
              {HOUR_OPTIONS.map((hour) => (
                <Pressable
                  key={hour}
                  style={[styles.chip, notificationHour === hour && styles.chipActive]}
                  onPress={() => onSelectHour(hour)}
                >
                  <Text
                    style={[
                      styles.chipText,
                      notificationHour === hour && styles.chipTextActive,
                    ]}
                  >
                    {formatHour(hour)}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content intensity</Text>
          <Text style={styles.helperText}>
            Hide words above this intensity across Today, Browse, and Search.
          </Text>
          <View style={styles.chipRow}>
            {SEVERITY_OPTIONS.map((option) => (
              <Pressable
                key={option}
                style={[styles.chip, maxSeverity === option && styles.chipActive]}
                onPress={() => onSelectSeverity(option)}
              >
                <Text
                  style={[styles.chipText, maxSeverity === option && styles.chipTextActive]}
                >
                  Up to {SEVERITY_LABELS[option]}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Pressable style={styles.linkRow} onPress={onShowDisclaimerAgain}>
            <Text style={styles.linkText}>What is this app?</Text>
          </Pressable>
          <Pressable style={styles.linkRow} onPress={onResetDisclaimer}>
            <Text style={styles.linkText}>Show mature-content notice again</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function formatHour(hour: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:00 ${period}`;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f6f8" },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: "800", color: "#1a1a1a", marginBottom: 20 },
  section: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 14, fontWeight: "700", color: "#1a1a1a", marginBottom: 8 },
  helperText: { fontSize: 13, color: "#777", marginBottom: 10 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  rowLabel: { fontSize: 15, color: "#333" },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  chipActive: { backgroundColor: "#1a1a1a" },
  chipText: { fontSize: 13, color: "#333", fontWeight: "600" },
  chipTextActive: { color: "#fff" },
  linkRow: { paddingVertical: 10 },
  linkText: { fontSize: 15, color: "#1a73e8" },
});
