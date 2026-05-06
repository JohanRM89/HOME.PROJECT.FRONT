
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import {
  Card,
  Checkbox,
  Chip,
  Text,
  TextInput,
} from "react-native-paper";

export default function TasksScreen() {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);


  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      {/* ═══════════════════════════════ */}
      {/* 1️⃣ BUSCADOR */}
      {/* ═══════════════════════════════ */}
      <TextInput
        placeholder="Buscar tarea por nombre"
        value={search}
        onChangeText={setSearch}
        left={<TextInput.Icon icon="magnify" />}
        style={{ marginBottom: 16 }}
      />

      {/* ═══════════════════════════════ */}
      {/* 2️⃣ FILTRO POR ESTADO */}
      {/* ═══════════════════════════════ */}
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
        {["Todos", "Pendientes", "En proceso", "Completadas"].map((status) => (
          <Chip
            key={status}
            selected={statusFilter === status}
            onPress={() => setStatusFilter(status)}
          >
            {status}
          </Chip>
        ))}
      </View>

      {/* ═══════════════════════════════ */}
      {/* 3️⃣ FILTRO POR PRIORIDAD */}
      {/* ═══════════════════════════════ */}
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        <PriorityChip
          label="Alta"
          color="#D32F2F"
          selected={priorityFilter === "Alta"}
          onPress={() => setPriorityFilter("Alta")}
        />
        <PriorityChip
          label="Media"
          color="#FBC02D"
          selected={priorityFilter === "Media"}
          onPress={() => setPriorityFilter("Media")}
        />
        <PriorityChip
          label="Baja"
          color="#388E3C"
          selected={priorityFilter === "Baja"}
          onPress={() => setPriorityFilter("Baja")}
        />
        <PriorityChip
          label="Urgente"
          color="#F57C00"
          selected={priorityFilter === "Urgente"}
          onPress={() => setPriorityFilter("Urgente")}
        />
      </View>

      {/* ═══════════════════════════════ */}
      {/* 4️⃣ LISTA DE TAREAS */}
      {/* ═══════════════════════════════ */}
      <TaskRow
        title="Actualizar documentos"
        time="18:00"
        type="Administrativa"
        status="Pendiente"
      />
      <TaskRow
        title="Cita médica"
        time="15:30"
        type="Salud"
        status="En proceso"
      />
      <TaskRow
        title="Pago de servicios"
        time="12:00"
        type="Finanzas"
        status="Completada"
      />
    </ScrollView>
  );

}
// * COMPONENTES */
/* ═══════════════════════════════ */

function PriorityChip({
  label,
  color,
  selected,
  onPress,
}: {
  label: string;
  color: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Chip
      selected={selected}
      onPress={onPress}
      style={{
        backgroundColor: selected ? color : undefined,
      }}
      textStyle={{
        color: selected ? "white" : undefined,
      }}
    >
      {label}
    </Chip>
  );
}

function TaskRow({
  title,
  time,
  type,
  status,
}: {
  title: string;
  time: string;
  type: string;
  status: "Pendiente" | "En proceso" | "Completada";
}) {
  const statusColor =
    status === "Pendiente"
      ? "#FBC02D"
      : status === "En proceso"
        ? "#1E88E5"
        : "#2E7D32";

  return (
    <Card style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* COLOR DE ESTADO */}
        <View
          style={{
            width: 6,
            height: "100%",
            backgroundColor: statusColor,
          }}
        />

        <Card.Content style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox status="unchecked" />
            <View style={{ flex: 1 }}>
              <Text variant="titleMedium">{title}</Text>
              <Text variant="bodySmall">
                {type} · Finaliza {time}
              </Text>
              <Chip style={{ alignSelf: "flex-start", marginTop: 4 }}>
                {status}
              </Chip>
            </View>

            {/* FLECHA */}

            <Pressable onPress={() => router.push("/(details)/tasks_detail")}>
              <Ionicons name="chevron-forward" size={22} />
            </Pressable>

          </View>
        </Card.Content>
      </View>
    </Card>
  );
}
