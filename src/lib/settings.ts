import AsyncStorage from "@react-native-async-storage/async-storage";
import { Severity } from "../data/types";

const DISCLAIMER_KEY = "settings:disclaimerSeen:v1";
const MAX_SEVERITY_KEY = "settings:maxSeverity:v1";
const NOTIFICATIONS_KEY = "settings:notificationsEnabled:v1";
const NOTIFICATION_HOUR_KEY = "settings:notificationHour:v1";

export async function getDisclaimerSeen(): Promise<boolean> {
  return (await AsyncStorage.getItem(DISCLAIMER_KEY)) === "true";
}

export async function setDisclaimerSeen(): Promise<void> {
  await AsyncStorage.setItem(DISCLAIMER_KEY, "true");
}

export async function getMaxSeverity(): Promise<Severity> {
  const raw = await AsyncStorage.getItem(MAX_SEVERITY_KEY);
  const parsed = raw ? (Number(raw) as Severity) : 4;
  return parsed >= 1 && parsed <= 4 ? parsed : 4;
}

export async function setMaxSeverity(value: Severity): Promise<void> {
  await AsyncStorage.setItem(MAX_SEVERITY_KEY, String(value));
}

export async function getNotificationsEnabled(): Promise<boolean> {
  return (await AsyncStorage.getItem(NOTIFICATIONS_KEY)) === "true";
}

export async function setNotificationsEnabled(value: boolean): Promise<void> {
  await AsyncStorage.setItem(NOTIFICATIONS_KEY, value ? "true" : "false");
}

export async function getNotificationHour(): Promise<number> {
  const raw = await AsyncStorage.getItem(NOTIFICATION_HOUR_KEY);
  return raw ? Number(raw) : 9;
}

export async function setNotificationHour(hour: number): Promise<void> {
  await AsyncStorage.setItem(NOTIFICATION_HOUR_KEY, String(hour));
}
