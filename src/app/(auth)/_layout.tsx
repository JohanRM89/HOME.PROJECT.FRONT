
import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/(main)");
    }
  }, [user, router]);

  return <Stack screenOptions={{ headerShown: false }} />;

}
