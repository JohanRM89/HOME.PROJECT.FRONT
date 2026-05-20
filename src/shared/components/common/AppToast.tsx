import { useToastStore } from "@/shared/storage/useToastStore";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export function AppToast() {
  const { message, type, visible, hide } = useToastStore();

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      hide();
    }, 6000);

    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible || !message) return null;

  const bgColor = type === "success" ? "#22C55E" : "#EF4444";

  return (
    <View
      style={{
        position: "absolute",
        top: 50,
        left: 16,
        right: 16,
        backgroundColor: bgColor,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        zIndex: 999,
        elevation: 10,
      }}
    >
      <Text style={{ color: "#FFF", flex: 1, fontWeight: "600" }}>
        {message}
      </Text>

      <TouchableOpacity onPress={hide}>
        <Ionicons name="close" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}