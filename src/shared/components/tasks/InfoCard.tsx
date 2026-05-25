import { formatDateEs } from "@/shared/ultis/formatDate";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { AvatarInitials } from "../member/avatars";

export function InfoCard({
  label,
  value,
  icon,
  iconType,
  isDate= false,
}: {
  label: string;
  value?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconType?: "avatar";
  isDate?: boolean;
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
        <AvatarInitials name={value || "User"} active={true} />

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

      <View style={{ flex: 1 , marginLeft: 3}}>
        <Text style={{ fontSize: 10, fontWeight: "900", color: "#CBD5E1" }}>
          {label}
        </Text>

        <Text style={{ fontSize: 14, fontWeight: "800", color: "#111827" }}>
        {isDate ? formatDateEs(value) : value}
        </Text>
      </View>
    </View>
  );
}