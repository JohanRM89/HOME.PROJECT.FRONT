import {
    Image,
    Pressable,
    View,
} from "react-native";
import { Text } from "react-native-paper";

export function MemberRow({
  name,
  role,
  avatar,
  badge,
  badgeType = "member",
}: {
  name: string;
  role: string;
  avatar: string;
  badge: string;
  badgeType?: "admin" | "member";
}) {
  const isAdmin = badgeType === "admin";

  return (
    <Pressable
      style={{
        minHeight: 74,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: avatar }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 999,
          marginRight: 14,
        }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 17, fontWeight: "900", color: "#111827" }}>
          {name}
        </Text>

        <Text style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>
          {role}
        </Text>
      </View>

      <View
        style={{
          backgroundColor: isAdmin ? "#EEF2F7" : "#FFECE5",
          paddingHorizontal: 10,
          paddingVertical: 6,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            color: isAdmin ? "#475569" : "#FA541C",
            fontSize: 10,
            fontWeight: "900",
          }}
        >
          {badge}
        </Text>
      </View>
    </Pressable>
  );
}