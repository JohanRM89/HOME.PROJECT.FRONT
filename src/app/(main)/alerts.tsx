import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { useCaseNotifications } from "@/shared/hooks/useCaseNotifications";
import { getNotificationUI } from "@/shared/ultis/notificationUI";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

const FILTERS = [
  'task_assigned',
  'task_completed',
  'task_created',
  'due_date',
  'alert',
  'family',
  'report'
];

export default function AlertsScreen() {
  const [filter, setFilter] = useState("Todas");
  const memberid = useAuthStore((s) => s.memberid);
  const { notificacions, loading_notificacions, error_notificacions, reload } = useCaseNotifications(memberid);
  return (
    <ScreenContainer noPadding>
      <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        {/* Header */}
        <View
          style={{
            height: 72,
            paddingHorizontal: 20,
            backgroundColor: "#FFFFFF",
            borderBottomWidth: 1,
            borderBottomColor: "#F1F5F9",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >


          <Text style={{ fontSize: 20, fontWeight: "900", color: "#111827" }}>
            Notificaciones
          </Text>

        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 14,
            paddingBottom: 120,
          }}
        >
          {/* Filtros */}
          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 8,
              marginBottom: 34,
            }}
          >
            {FILTERS.map((item) => {
              const active = filter === item;

              return (
                <Pressable
                  key={item}
                  onPress={() => setFilter(item)}
                  style={{
                    height: 32,
                    paddingHorizontal: 18,
                    borderRadius: 999,
                    backgroundColor: active ? "#FA541C" : "#F1F5F9",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: active ? "#FFFFFF" : "#475569",
                      fontSize: 14,
                      fontWeight: "700",
                    }}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView> */}

          <SectionTitle title="Tus notificaciones " />
          {notificacions?.data.length === 0 ? (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 18,
                borderWidth: 1,
                borderColor: "#EEF2F7",
                paddingVertical: 34,
                paddingHorizontal: 24,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: 999,
                  backgroundColor: "#FFF1E8",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <Ionicons
                  name="clipboard-outline"
                  size={32}
                  color="#FA541C"
                />
              </View>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "900",
                  color: "#111827",
                  marginBottom: 8,
                }}
              >
                No hay notificaciones
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  lineHeight: 22,
                  color: "#64748B",
                  textAlign: "center",
                }}
              >
                Cuando tengas nuevas notificaciones aparecerán aquí.
              </Text>
            </View>
          ) : (<>


            {notificacions?.data.map((noti, index) => {
              const ui = getNotificationUI(noti);

              return (
                <AlertRow
                  key={index}
                  icon={ui.icon}
                  iconColor={ui.iconColor}
                  iconBg={ui.iconBg}
                  title={ui.title}
                  description={ui.description}
                  unread={!noti.is_read}
                />
              );
            })}


          </>)
          }
    
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <Text
      style={{
        fontSize: 14,
        fontWeight: "900",
        color: "#6B7280",
        letterSpacing: 1,
        marginBottom: 14,
      }}
    >
      {title}
    </Text>
  );
}

function AlertRow({
  icon,
  iconColor,
  iconBg,
  title,
  description,
  time,
  unread = false,
  muted = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  time?: string;
  unread?: boolean;
  muted?: boolean;
}) {
  return (

    <Pressable
      style={{
        minHeight: 82,
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 14,
        paddingHorizontal: 14,
        backgroundColor: unread ? "#FFFFFF" : "#F8FAFC",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: unread ? iconColor: "#E2E8F0",
        marginBottom: 12,
      }}
    >

      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          backgroundColor: iconBg,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 16,
          opacity: muted ? 0.8 : 1,
        }}
      >
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "900",
            color: muted ? "#64748B" : "#111827",
            marginBottom: 4,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            fontSize: 14,
            lineHeight: 20,
            color: muted ? "#94A3B8" : "#64748B",
          }}
        >
          {description}
        </Text>
      </View>

      <View
        style={{
          alignItems: "flex-end",
          marginLeft: 10,
          paddingTop: 2,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "#94A3B8",
            marginBottom: 12,
          }}
        >
          {time}
        </Text>

        {unread && (
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              backgroundColor: "#FA541C",
            }}
          />
        )}
      </View>
    </Pressable>
  );
}