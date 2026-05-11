import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Card,
  Chip,
  Text,
} from "react-native-paper";

export default function AlertsScreen() {
  const [filter, setFilter] = useState("Todas");

  return (
    <ScreenContainer>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        {/* ═══════════════════════════════ */}
        {/* TÍTULO */}
        {/* ═══════════════════════════════ */}
        <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
          Notificaciones
        </Text>

        {/* ═══════════════════════════════ */}
        {/* FILTROS */}
        {/* ═══════════════════════════════ */}
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 24 }}>
          {["Todas", "Tareas", "Alertas", "Familia"].map((item) => (
            <Chip
              key={item}
              selected={filter === item}
              onPress={() => setFilter(item)}
            >
              {item}
            </Chip>
          ))}
        </View>

        {/* ═══════════════════════════════ */}
        {/* SECCIÓN HOY */}
        {/* ═══════════════════════════════ */}
        <SectionTitle title="Hoy" />

        <AlertRow
          icon="clipboard-outline"
          title="Tarea pendiente"
          description="Actualizar documentos familiares"
          time="10:45 AM"
        />

        <AlertRow
          icon="alert-circle-outline"
          title="Recordatorio"
          description="Cita médica mañana"
          time="08:30 AM"
        />

        {/* ═══════════════════════════════ */}
        {/* SECCIÓN HACE 2 DÍAS */}
        {/* ═══════════════════════════════ */}
        <SectionTitle title="Hace 2 días" />

        <AlertRow
          icon="people-outline"
          title="Familia"
          description="Nuevo miembro agregado al grupo"
          time="06:15 PM"
        />

        <AlertRow
          icon="clipboard-outline"
          title="Tarea completada"
          description="Pago de servicios confirmado"
          time="02:10 PM"
        />

        {/* ═══════════════════════════════ */}
        {/* SECCIÓN HACE 1 SEMANA */}
        {/* ═══════════════════════════════ */}
        <SectionTitle title="Hace 1 semana" />

        <AlertRow
          icon="alert-circle-outline"
          title="Alerta importante"
          description="Actualización de políticas"
          time="09:00 AM"
        />
      </ScrollView>
    </ScreenContainer>

  );
}

/* ═══════════════════════════════ */
/* COMPONENTES REUTILIZABLES */
/* ═══════════════════════════════ */

function SectionTitle({ title }: { title: string }) {
  return (
    <Text
      variant="titleMedium"
      style={{ marginTop: 16, marginBottom: 8 }}
    >
      {title}
    </Text>
  );
}

function AlertRow({
  icon,
  title,
  description,
  time,
}: {
  icon: string;
  title: string;
  description: string;
  time: string;
}) {
  return (
    <Card style={{ marginBottom: 12 }}>
      <Card.Content style={{ flexDirection: "row", gap: 12 }}>
        <Ionicons name={icon as any} size={28} color="#6750A4" />

        <View style={{ flex: 1 }}>
          <Text variant="titleMedium">{title}</Text>
          <Text variant="bodyMedium">{description}</Text>
          <Text variant="bodySmall" style={{ marginTop: 4, color: "#6b6b6b" }}>
            {time}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}