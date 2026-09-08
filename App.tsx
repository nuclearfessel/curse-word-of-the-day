import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { DisclaimerModal } from "./src/components/DisclaimerModal";
import { getDisclaimerSeen, setDisclaimerSeen } from "./src/lib/settings";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

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

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1a1a1a" />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <DisclaimerModal visible={showDisclaimer} onAccept={onAcceptDisclaimer} />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f6f8",
  },
});
