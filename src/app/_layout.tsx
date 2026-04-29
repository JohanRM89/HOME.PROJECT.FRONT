import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { theme } from "@/shared/theme/paper.theme";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";

const STORAGE_KEY = "auth-storage";

export default function RootLayout() {
  const login = useAuthStore((s) => s.login);

  useEffect(() => {
    const restoreSession = async () => {
      const stored = await SecureStore.getItemAsync(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        login(data); //  rehidrata el store
      }
    };

    restoreSession();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}