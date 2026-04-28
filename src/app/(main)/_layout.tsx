import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";

export default function MainLayout() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/login");
    }
  }, [user]);

  return <Slot />;
}
