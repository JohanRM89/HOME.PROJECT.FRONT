// app/(main)/index.tsx
import { ScrollView, View } from "react-native";

import {
  Card,
  Chip,
  IconButton,
  Text,
} from "react-native-paper";

import { Ionicons } from "@expo/vector-icons";


export default function HomeScreen() {
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      {/* ═══════════════════════════════ */}
      {/* 1️⃣ ESTADOS DEL GRUPO FAMILIAR */}
      {/* ═══════════════════════════════ */}
      <Text variant="headlineMedium" style={{ marginBottom: 12 }}>
        Grupo familiar
      </Text>

      <View style={{ flexDirection: "row", gap: 12 }}>
        <StatusCard
          title="Pendientes"
          count={3}
          color="#F2B705"
          icon="time-outline"
        />
        <StatusCard
          title="En proceso"
          count={2}
          color="#1E88E5"
          icon="sync-outline"
        />
        <StatusCard
          title="Completados"
          count={5}
          color="#2E7D32"
          icon="checkmark-done-outline"
        />
      </View>

      {/* ═══════════════════════════════ */}
      {/* 2️⃣ MIS TAREAS */}
      {/* ═══════════════════════════════ */}
      <SectionHeader title="Mis tareas" />

      <TaskCard
        title="Actualizar documentos"
        description="Subir documentos de identidad"
        status="Pendiente"
      />
      <TaskCard
        title="Cita médica"
        description="Agendar cita anual"
        status="En proceso"
      />
      <TaskCard
        title="Pago de servicios"
        description="Registrar comprobante"
        status="Completado"
      />

      {/* ═══════════════════════════════ */}
      {/* 3️⃣ PENDIENTES DEL GRUPO */}
      {/* ═══════════════════════════════ */}
      <SectionHeader title="Pendientes familiares" />

      <TaskCard
        title="Actualización escolar"
        description="Subir boletín académico"
        status="Pendiente"
      />
      <TaskCard
        title="Vacunación"
        description="Confirmar esquema"
        status="En proceso"
      />
      <TaskCard
        title="Revisión anual"
        description="Completar formulario"
        status="Pendiente"
      />
    </ScrollView>
  );
}

/* ═══════════════════════════════ */
/* COMPONENTES REUTILIZABLES */
/* ═══════════════════════════════ */

function StatusCard({
  title,
  count,
  color,
  icon,
}: {
  title: string;
  count: number;
  color: string;
  icon: string;
}) {
  return (
    <Card style={{ flex: 1 }}>
      <Card.Content style={{ alignItems: "center", gap: 8 }}>
        <Ionicons name={icon as any} size={28} color={color} />
        <Text variant="titleLarge">{count}</Text>
        <Text>{title}</Text>
      </Card.Content>
    </Card>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View
      style={{
        marginTop: 24,
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text variant="titleLarge">{title}</Text>
      <IconButton
        icon="chevron-right"
        size={22}
        onPress={() => console.log("Ver todo")}
      />
    </View>
  );
}

function TaskCard({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: "Pendiente" | "En proceso" | "Completado";
}) {
  const statusColor =
    status === "Pendiente"
      ? "#F2B705"
      : status === "En proceso"
      ? "#1E88E5"
      : "#2E7D32";

  return (
    <Card style={{ marginBottom: 12 }}>
      <Card.Content style={{ flexDirection: "row", gap: 12 }}>
        <Ionicons name="clipboard-outline" size={28} color={statusColor} />
        <View style={{ flex: 1 }}>
          <Text variant="titleMedium">{title}</Text>
          <Text variant="bodyMedium">{description}</Text>

          <View style={{ marginTop: 6, alignSelf: "flex-start" }}>
            <Chip>{status}</Chip>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
