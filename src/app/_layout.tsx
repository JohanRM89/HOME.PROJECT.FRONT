import { theme } from "@/shared/theme/paper.theme";
import { Stack } from "expo-router";

import { useAuthStore } from "@/modules/auth/ui/auth.store";

import * as storage from "@/shared/storage/secureStorage";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";


const STORAGE_KEY = "auth";

export default function RootLayout() {

  const hydrate = useAuthStore((s) => s.hydrate);
  console.log("Hy",hydrate)
  useEffect(() => {
    const restore = async () => {
      const stored = await storage.getItem(STORAGE_KEY);
      console.log("sta",stored)
      hydrate(stored ? JSON.parse(stored) : null);
    };

    restore();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
