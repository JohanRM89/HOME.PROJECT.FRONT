import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export default function ReportsScreen() {
  return (
    <ScreenContainer noPadding>
      <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <View
          style={{
            height: 72,
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
            Reportes de Cumplimiento
          </Text>

          <TouchableOpacity>
            <Ionicons name="calendar-outline" size={24} color="#334155" />
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
          <Text
            style={{
              fontSize: 26,
              fontWeight: "900",
              color: "#111827",
              marginBottom: 24,
            }}
          >
            Rendimiento semanal
          </Text>

          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#EEF2F7",
              padding: 24,
              height: 330,
              marginBottom: 44,
            }}
          >
            <Text style={{ fontSize: 15, color: "#64748B", marginBottom: 4 }}>
              Tareas completadas totales
            </Text>

            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <Text
                style={{
                  fontSize: 42,
                  fontWeight: "900",
                  color: "#111827",
                  letterSpacing: -1,
                }}
              >
                85%
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                  marginBottom: 8,
                  color: "#10B981",
                  fontSize: 14,
                  fontWeight: "900",
                }}
              >
                ↗ +12% esta semana
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                marginTop: 28,
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <ChartBar name="Ana" value={70} />
              <ChartBar name="Luis" value={55} />
              <ChartBar name="Marta" value={90} />
              <ChartBar name="Juan" value={65} />
            </View>
          </View>

          <Text
            style={{
              fontSize: 22,
              fontWeight: "900",
              color: "#111827",
              marginBottom: 18,
            }}
          >
            Progreso individual
          </Text>

          <View style={{ gap: 16 }}>
            <ProgressCard
              name="Marta Sánchez"
              detail="9 de 10 tareas completadas"
              percent={90}
            />

            <ProgressCard
              name="Ana García"
              detail="7 de 10 tareas completadas"
              percent={70}
            />

            <ProgressCard
              name="Juan Pérez"
              detail="13 de 20 tareas completadas"
              percent={65}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 18,
              marginTop: 28,
            }}
          >
            <SummaryCard
              icon="checkmark-done-circle-outline"
              value="42"
              label="Total completadas"
              color="#FA541C"
              bg="#FFF1E8"
              border="#FED7C3"
            />

            <SummaryCard
              icon="calendar-outline"
              value="8"
              label="Pendientes"
              color="#64748B"
              bg="#F1F5F9"
              border="#E2E8F0"
            />
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

function ChartBar({ name, value }: { name: string; value: number }) {
  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <View
        style={{
          height: 145,
          width: 34,
          borderRadius: 999,
          backgroundColor: "#F1F5F9",
          justifyContent: "flex-end",
          overflow: "hidden",
          marginBottom: 14,
        }}
      >
        <View
          style={{
            height: `${value}%`,
            backgroundColor: "#FA541C",
            borderRadius: 999,
          }}
        />
      </View>

      <Text style={{ color: "#64748B", fontSize: 12, fontWeight: "800" }}>
        {name}
      </Text>
    </View>
  );
}

function ProgressCard({
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

function SummaryCard({
  icon,
  value,
  label,
  color,
  bg,
  border,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: bg,
        borderWidth: 1,
        borderColor: border,
        borderRadius: 14,
        padding: 18,
        minHeight: 116,
        justifyContent: "space-between",
      }}
    >
      <Ionicons name={icon} size={26} color={color} />

      <View>
        <Text style={{ fontSize: 28, fontWeight: "900", color: "#111827" }}>
          {value}
        </Text>

        <Text style={{ color: "#64748B", fontSize: 13 }}>{label}</Text>
      </View>
    </View>
  );
}