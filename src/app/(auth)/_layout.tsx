
import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {

  const user = useAuthStore((s) => s.user);
  const memberid = useAuthStore((s) => s.memberid);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (!memberid) {
        router.replace("/(auth)/family-setup");
        return
      }
      router.replace("/(main)");
    }
  }, [user, router]);

  return <Stack screenOptions={{ headerShown: false }} />;

}
