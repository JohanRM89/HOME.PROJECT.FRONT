import { View } from "react-native";
import { Text } from "react-native-paper";

export function AvatarInitials({ name, active = false }: { name: string; active?: boolean }) {
  return (
    <View
      style={{
        width: 42,
        height: 42,
        borderRadius: 999,
        backgroundColor: active ? "#FA541C" : "#E2E8F0",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: active ? "#FFFFFF" : "#64748B", fontSize: 14, fontWeight: "900" }}>
        {getInitials(name)}
      </Text>
    </View>
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}