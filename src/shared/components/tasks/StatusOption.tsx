import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Text } from "react-native-paper";
export function StatusOption({
  active = false,
  icon,
  label,
}: {
  active?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <Pressable
      style={{
        flex: 1,
        height: 64,
        borderRadius: 10,
        backgroundColor: active ? "#FFFFFF" : "transparent",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: active ? 1 : 0,
        borderColor: "#E2E8F0",
        shadowColor: "#000",
        shadowOpacity: active ? 0.05 : 0,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: active ? 2 : 0,
      }}
    >
      <Ionicons
        name={icon}
        size={22}
        color={active ? "#FA541C" : "#94A3B8"}
      />

      <Text
        style={{
          marginTop: 5,
          color: active ? "#111827" : "#64748B",
          fontSize: 10,
          fontWeight: "900",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}