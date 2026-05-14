import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";
export function CalendarTaskRow({
  title,
  time,
  status,
  icon,
  bg,
  color,
}: {
  title: string;
  time: string;
  status: string;
  icon: keyof typeof Ionicons.glyphMap;
  bg: string;
  color: string;
}) {
  return (
    <Pressable
      style={{
        minHeight: 82,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          backgroundColor: bg,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 16,
        }}
      >
        <Ionicons name={icon} size={25} color={color} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 17, fontWeight: "900", color: "#111827" }}>
          {title}
        </Text>

        <Text style={{ fontSize: 15, color: "#64748B", marginTop: 2 }}>
          {time} • {status}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={22} color="#CBD5E1" />
    </Pressable>
  );
}