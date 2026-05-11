import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  IconButton,
  Text,
  TextInput,
} from "react-native-paper";

type Status = "Pendiente" | "En proceso" | "Completada";

export default function TaskDetailScreen() {
  const router = useRouter();

  const [status, setStatus] = useState<Status>("Pendiente");
  const [note, setNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  const statusColor =
    status === "Pendiente"
      ? "#FBC02D"
      : status === "En proceso"
      ? "#1E88E5"
      : "#2E7D32";

  const canChangeStatus = (next: Status) => {
    if (status === "Pendiente" && next === "Completada") return false;
    if (status === "Completada") return false;
    return true;
  };

  return (
                <ScreenContainer>
    
    <ScrollView>
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable onPress={() => router.push("/(main)/tasks")}>
          <Ionicons name="chevron-back" size={24} />
        </Pressable>

        <Text variant="titleLarge">Detalle de tarea</Text>

        <IconButton
          icon="dots-vertical"
          onPress={() => console.log("Editar / Eliminar")}
        />
      </View>

      {/* ESTADO */}
      <View
        style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: statusColor,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Estado: {status}
        </Text>
      </View>

      {/* TITULO Y DESCRIPCIÓN */}
      <Text variant="headlineSmall" style={{ marginTop: 16 }}>
        Actualizar documentos familiares
      </Text>

      <Text style={{ marginTop: 4 }}>
        Subir y validar los documentos solicitados para el grupo familiar.
      </Text>

      {/* CAMBIO DE ESTADO */}
      <Text variant="titleMedium" style={{ marginTop: 24 }}>
        Estado actual
      </Text>

      <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
        {(["Pendiente", "En proceso", "Completada"] as Status[]).map(
          (item) => (
            <Chip
              key={item}
              selected={status === item}
              disabled={!canChangeStatus(item)}
              onPress={() => canChangeStatus(item) && setStatus(item)}
            >
              {item}
            </Chip>
          )
        )}
      </View>

      {/* RESPONSABLE Y FECHA */}
      <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
        <Card style={{ flex: 1 }}>
          <Card.Content>
            <Text variant="labelMedium">Responsable</Text>
            <Text>Juan Pérez</Text>
          </Card.Content>
        </Card>

        <Card style={{ flex: 1 }}>
          <Card.Content>
            <Text variant="labelMedium">Fecha vencimiento</Text>
            <Text>30/04/2026</Text>
          </Card.Content>
        </Card>
      </View>

      {/* DESCRIPCIÓN */}
      <Text variant="titleMedium" style={{ marginTop: 24 }}>
        Descripción
      </Text>
      <Text>
        Esta tarea es requerida para completar el proceso administrativo.
      </Text>

      {/* NOTAS Y COMENTARIOS */}
      <Text variant="titleMedium" style={{ marginTop: 24 }}>
        Notas
      </Text>

      {!showNoteInput && (
        <Button
          mode="outlined"
          onPress={() => setShowNoteInput(true)}
        >
          Agregar nota
        </Button>
      )}

      {showNoteInput && (
        <View style={{ marginTop: 8 }}>
          <TextInput
            label="Escribe una nota"
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={4}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 8,
            }}
          >
            <Button
              onPress={() => {
                setShowNoteInput(false);
                setNote("");
              }}
            >
              Cancelar
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                console.log("Guardar nota:", note);
                setShowNoteInput(false);
              }}
            >
              Agregar
            </Button>
          </View>
        </View>
      )}

      {/* LISTA DE NOTAS (mock) */}
      <Card style={{ marginTop: 16 }}>
        <Card.Content>
          <Text>- Revisar documentos de identidad</Text>
          <Text>- Validación pendiente</Text>
        </Card.Content>
      </Card>
    </ScrollView>
              </ScreenContainer>
  
  );
}
