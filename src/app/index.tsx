import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { Redirect } from "expo-router";

export default function Index() {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(main)/home" />;
}
