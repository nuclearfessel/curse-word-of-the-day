import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import {
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_800ExtraBold,
} from "@expo-google-fonts/playfair-display";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { TabNavigator } from "./src/navigation/TabNavigator";
import { DisclaimerModal } from "./src/components/DisclaimerModal";
import { getDisclaimerSeen, setDisclaimerSeen } from "./src/lib/settings";
import { ThemeProvider, useAppTheme } from "./src/ThemeContext";

function AppContent() {
  const [loading, setLoading] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const { colors, resolvedScheme } = useAppTheme();
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_800ExtraBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    getDisclaimerSeen().then((seen) => {
      setShowDisclaimer(!seen);
      setLoading(false);
    });
  }, []);

  const onAcceptDisclaimer = async () => {
    await setDisclaimerSeen();
    setShowDisclaimer(false);
  };

  if (loading || !fontsLoaded) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  const navigationTheme =
    resolvedScheme === "dark"
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: colors.background,
            card: colors.surface,
            text: colors.textPrimary,
            border: colors.border,
            primary: colors.primary,
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: colors.background,
            card: colors.surface,
            text: colors.textPrimary,
            border: colors.border,
            primary: colors.primary,
          },
        };

  return (
    <>
      <NavigationContainer theme={navigationTheme}>
        <TabNavigator />
      </NavigationContainer>
      <DisclaimerModal visible={showDisclaimer} onAccept={onAcceptDisclaimer} />
      <StatusBar style={resolvedScheme === "dark" ? "light" : "dark"} />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
