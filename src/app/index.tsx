import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { useRouter } from "expo-router";
import { useEffect } from "react";



export default function Index() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    console.log("user",user)
    if (!user) {
      router.replace("/(auth)/login");
    } else {
      router.replace("/(main)");
    }
  }, [user, router]);

  return null;
}
