import { theme } from "@/shared/theme/paper.theme";
import { Stack } from "expo-router";

import { useAuthStore } from "@/modules/auth/ui/auth.store";

import * as storage from "@/shared/storage/secureStorage";
import { useEffect } from "react";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";


const STORAGE_KEY = "auth-storage";

export default function RootLayout() {

  const hydrate = useAuthStore((s) => s.hydrate);
  useEffect(() => {
    const restore = async () => {
      const stored = await storage.getItem(STORAGE_KEY);
      hydrate(stored ? JSON.parse(stored) : null);
    };

    restore();
  }, []);

  return (

    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <View style={{ flex: 1, backgroundColor: "#F8F6F6" }}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </PaperProvider>
    </SafeAreaProvider>

  );
}
