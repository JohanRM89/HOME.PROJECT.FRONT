import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { MemberRow } from "@/shared/components/member/memberRow";
import { useMembers } from "@/shared/hooks/useMembers";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Modal, Portal, Text } from "react-native-paper";

export default function MembersScreen() {
  const [visible, setVisible] = useState(false);
  const memberid = useAuthStore((s) => s.memberid);

  const { error_members, loading_members, members, reload } = useMembers(memberid);
  const dataMembers = members?.data;
  const inviteCode = dataMembers?.invitation_code;
  const countMembers = dataMembers?.miembros.length;
  const copyCode = async () => {
    await Clipboard.setStringAsync(String(inviteCode));
  };

const random = Math.random();

  return (
    <ScreenContainer noPadding>
      <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <View
          style={{
            height: 68,
            backgroundColor: "#FFFFFF",
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#F1F5F9",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>

          <Text style={{ fontSize: 19, fontWeight: "900", color: "#111827" }}>
            Miembros del Hogar
          </Text>

          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#334155" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 28,
            paddingBottom: 120,
          }}
        >
          <View
            style={{
              backgroundColor: "#FFF7F3",
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#FED7C3",
              padding: 22,
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <View style={{ position: "relative", marginRight: 18 }}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=200" }}
                style={{
                  width: 78,
                  height: 78,
                  borderRadius: 999,
                  borderWidth: 4,
                  borderColor: "#FFFFFF",
                }}
              />

              <View
                style={{
                  position: "absolute",
                  right: -2,
                  bottom: 2,
                  width: 24,
                  height: 24,
                  borderRadius: 999,
                  backgroundColor: "#FA541C",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "#FFFFFF",
                }}
              >
                <Ionicons name="pencil" size={13} color="#FFFFFF" />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 22, fontWeight: "900", color: "#111827" }}>
                {dataMembers?.name}
              </Text>

              <Text style={{ fontSize: 15, color: "#64748B", marginTop: 2 }}>
                Hogar principal • {countMembers} miembros
              </Text>

              <View
                style={{
                  marginTop: 8,
                  alignSelf: "flex-start",
                  backgroundColor: "#FFDCCB",
                  borderRadius: 6,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                }}
              >
                <Text
                  style={{
                    color: "#FA541C",
                    fontSize: 12,
                    fontWeight: "900",
                  }}
                >
                  PLAN PREMIUM
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setVisible(true)}
            style={{
              height: 48,
              borderRadius: 10,
              backgroundColor: "#FA541C",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 8,
              marginBottom: 24,
              shadowColor: "#FA541C",
              shadowOpacity: 0.25,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 8 },
              elevation: 6,
            }}
          >
            <Ionicons name="person-add-outline" size={20} color="#FFFFFF" />

            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "900" }}>
              Invitar nuevo miembro
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                fontWeight: "900",
                color: "#111827",
                letterSpacing: 0.6,
              }}
            >
              LISTA DE FAMILIARES
            </Text>

            {/* <TouchableOpacity>
              <Text style={{ color: "#FA541C", fontSize: 13, fontWeight: "800" }}>
                Gestionar roles
              </Text>
            </TouchableOpacity> */}
          </View>

          <View style={{ gap: 14 }}>
            {dataMembers?.miembros.map((m, i) => (
              <MemberRow
                key={i}
                name={m.name}
                avatar={`https://i.pravatar.cc/100?img=${random}`}
                badge={m.role === "admin" ? "ADMINISTRADOR" : "MIEMBRO"}
                badgeType={m.role}
              />

            ))}
          </View>
        </ScrollView>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={{
              backgroundColor: "#FFFFFF",
              padding: 24,
              margin: 24,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 22,
                fontWeight: "900",
                color: "#111827",
                marginBottom: 12,
              }}
            >
              Código de invitación
            </Text>

            <Pressable
              onPress={copyCode}
              style={{
                backgroundColor: "#FFF1E8",
                borderRadius: 14,
                paddingVertical: 18,
                marginBottom: 14,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#FA541C",
                  fontSize: 30,
                  fontWeight: "900",
                  letterSpacing: 1,
                }}
              >
                {inviteCode}
              </Text>
            </Pressable>

            <Text
              style={{
                textAlign: "center",
                color: "#64748B",
                marginBottom: 22,
              }}
            >
              Toca el código para copiarlo
            </Text>

            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{
                height: 48,
                borderRadius: 999,
                backgroundColor: "#FA541C",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "900", fontSize: 15 }}>
                Cerrar
              </Text>
            </TouchableOpacity>
          </Modal>
        </Portal>
      </View>
    </ScreenContainer>
  );
}

