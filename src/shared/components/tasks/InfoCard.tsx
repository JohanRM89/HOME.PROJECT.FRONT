import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { View } from "react-native";
import { Text } from "react-native-paper";

export  function InfoCard({
  label,
  value,
  icon,
  iconType,
}: {
  label: string;
  value?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconType?: "avatar";
}) {
  return (
    <View
      style={{
        flex: 1,
        minHeight: 64,
        backgroundColor: "#F8FAFC",
        borderRadius: 12,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {iconType === "avatar" ? (
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=12" }}
          style={{ width: 42, height: 42, borderRadius: 999, marginRight: 10 }}
        />
      ) : (
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            backgroundColor: "#FFECE5",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Ionicons name={icon ?? "calendar-outline"} size={24} color="#FA541C" />
        </View>
      )}

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 10, fontWeight: "900", color: "#CBD5E1" }}>
          {label}
        </Text>

        <Text style={{ fontSize: 14, fontWeight: "800", color: "#111827" }}>
          {value}
        </Text>
      </View>
    </View>
  );
}