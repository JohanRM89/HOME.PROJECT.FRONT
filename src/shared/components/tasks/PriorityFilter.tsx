import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

export function PriorityFilter({ label }: { label: string }) {
  return (
    <Pressable
      style={{
        height: 38,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#FFD6C8",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#FFFFFF",
      }}
    >
      <Ionicons name="flag-outline" size={16} color="#FA541C" />

      <Text
        style={{
          fontSize: 13,
          color: "#1E293B",
          fontWeight: "600",
        }}
      >
        {label}
      </Text>

      <Ionicons name="chevron-down" size={16} color="#1E293B" />
    </Pressable>
  );
}