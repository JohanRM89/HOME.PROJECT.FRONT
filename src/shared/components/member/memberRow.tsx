import { useState } from "react";
import {
  Modal,
  Pressable,
  View
} from "react-native";
import { Text } from "react-native-paper";
import { AvatarInitials } from "./avatars";
export function MemberRow({
  name,
  avatar,
  badge,
  badgeType,
}: {
  name: string;
  avatar: string;
  badge: string;
  badgeType?: string;
}) {
  const isAdmin = badgeType === "admin";
  const [showName, setShowName] = useState(false);
  return (
    <>
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
        onLongPress={() => setShowName(true)}
        delayLongPress={350}
        // @ts-ignore web
        title={name}

      >
     
        <AvatarInitials name={name} active={true} />

        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 17,
              fontWeight: "900",
              color: "#111827",
              marginLeft: 8,
              maxWidth: 140,
            }}
          >
            {name}
          </Text>

          {/* <Text style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>
          {role}
        </Text> */}
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
      <Modal
        transparent
        visible={showName}
        animationType="fade"
        onRequestClose={() => setShowName(false)}
      >
        <Pressable
          onPress={() => setShowName(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.25)",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 18,
              paddingVertical: 18,
              paddingHorizontal: 20,
              maxWidth: "90%",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "900",
                color: "#111827",
                textAlign: "center",
              }}
            >
              {name}
            </Text>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}