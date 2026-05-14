import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "react-native-paper";

export function ProgressCard({
  name,
  detail,
  percent,
}: {
  name: string;
  detail: string;
  percent: number;
}) {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        padding: 18,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: 999,
            backgroundColor: "#E2E8F0",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 14,
          }}
        >
          <Ionicons name="person-outline" size={24} color="#64748B" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "900", color: "#111827" }}>
            {name}
          </Text>

          <Text style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>
            {detail}
          </Text>
        </View>

        <Text style={{ color: "#FA541C", fontSize: 16, fontWeight: "900" }}>
          {percent}%
        </Text>
      </View>

      <View
        style={{
          height: 8,
          backgroundColor: "#EEF2F7",
          borderRadius: 999,
          marginTop: 16,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${percent}%`,
            height: "100%",
            backgroundColor: "#FA541C",
            borderRadius: 999,
          }}
        />
      </View>
    </View>
  );
}