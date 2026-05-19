import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

type MemberOption = {
  id: string;
  name: string;
  role?: string;
};

export function MemberSelect({
  label = "Asignar a",
  value,
  members,
  onChange,
}: {
  label?: string;
  value?: string;
  members?: MemberOption[];
  onChange: (memberId: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  const selected = members?.find((m) => m.id === value);

  return (
    <>
      <Pressable onPress={() => setVisible(true)} style={selectBox}>
        {selected ? (
          <AvatarInitials name={selected.name} active />
        ) : (
          <View style={emptyAvatar}>
            <Ionicons name="person-add-outline" size={22} color="#FA541C" />
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text style={{ color: "#94A3B8", fontSize: 12, fontWeight: "800" }}>
            {label}
          </Text>

          <Text style={{ color: selected ? "#111827" : "#94A3B8", fontSize: 16, fontWeight: "800" }}>
            {selected?.name ?? "Selecciona un miembro"}
          </Text>
        </View>

        <Ionicons name="chevron-down" size={20} color="#94A3B8" />
      </Pressable>

      <Modal transparent visible={visible} animationType="fade">
        <Pressable
          onPress={() => setVisible(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.25)",
            justifyContent: "flex-end",
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#FFFFFF",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 22,
              maxHeight: "70%",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "900", color: "#111827", marginBottom: 18 }}>
              Selecciona responsable
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ gap: 10 }}>
                {members?.map((member) => {
                  const active = member.id === value;

                  return (
                    <TouchableOpacity
                      key={member.id}
                      activeOpacity={0.85}
                      onPress={() => {
                        onChange(member.id);
                        setVisible(false);
                      }}
                      style={{
                        minHeight: 58,
                        borderRadius: 16,
                        paddingHorizontal: 14,
                        backgroundColor: active ? "#FFF1E8" : "#F8FAFC",
                        borderWidth: 1,
                        borderColor: active ? "#FA541C" : "#EEF2F7",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <AvatarInitials name={member.name} active={active} />

                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={{ color: active ? "#FA541C" : "#111827", fontSize: 15, fontWeight: "900" }}>
                          {member.name}
                        </Text>

                        {member.role && (
                          <Text style={{ color: "#64748B", fontSize: 12, marginTop: 2 }}>
                            {member.role}
                          </Text>
                        )}
                      </View>

                      {active && (
                        <Ionicons name="checkmark-circle" size={22} color="#FA541C" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function AvatarInitials({ name, active = false }: { name: string; active?: boolean }) {
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

const selectBox = {
  minHeight: 64,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "#E2E8F0",
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 14,
  flexDirection: "row" as const,
  alignItems: "center" as const,
  gap: 12,
};

const emptyAvatar = {
  width: 42,
  height: 42,
  borderRadius: 999,
  backgroundColor: "#FFF1E8",
  justifyContent: "center" as const,
  alignItems: "center" as const,
};