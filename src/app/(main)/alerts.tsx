import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

const FILTERS = ["Todas", "Tareas", "Alertas", "Familia"];

export default function AlertsScreen() {
  const [filter, setFilter] = useState("Todas");

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
          <ScrollView
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
          </ScrollView>

          <SectionTitle title="HOY" />

          <AlertRow
            icon="checkmark-circle-outline"
            iconColor="#22C55E"
            iconBg="#DCFCE7"
            title="Juan completó Lavar platos"
            description="¡Buen trabajo! Una tarea menos en la lista familiar."
            time="10m"
            unread
          />

          <AlertRow
            icon="briefcase-outline"
            iconColor="#FA541C"
            iconBg="#FFECE5"
            title="Nueva tarea asignada"
            description="Se te ha asignado: 'Limpiar el jardín'."
            time="1h"
            unread
          />

          <AlertRow
            icon="notifications-outline"
            iconColor="#FA541C"
            iconBg="#FFF7ED"
            title="Recordatorio urgente"
            description="Recordatorio: La tarea 'Sacar la basura' vence hoy."
            time="3h"
          />

          <SectionTitle title="AYER" />

          <AlertRow
            icon="people-outline"
            iconColor="#94A3B8"
            iconBg="#F1F5F9"
            title="María se unió al grupo"
            description="Ahora puede colaborar en las tareas del hogar."
            time="24h"
            muted
          />
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
  time: string;
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
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
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