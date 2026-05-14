import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "react-native-paper";
export function SummaryCard({
  icon,
  value,
  label,
  color,
  bg,
  border,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value?: number;
  label: string;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: bg,
        borderWidth: 1,
        borderColor: border,
        borderRadius: 14,
        padding: 18,
        minHeight: 116,
        justifyContent: "space-between",
      }}
    >
      <Ionicons name={icon} size={26} color={color} />

      <View>
        <Text style={{ fontSize: 28, fontWeight: "900", color: "#111827" }}>
          {value}
        </Text>

        <Text style={{ color: "#64748B", fontSize: 13 }}>{label}</Text>
      </View>
    </View>
  );
}