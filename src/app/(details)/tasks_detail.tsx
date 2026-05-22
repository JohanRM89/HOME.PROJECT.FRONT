import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { TaskUseCase } from "@/modules/tasks/application/task.usecase";
import { CreateCommentTask } from "@/modules/tasks/domain/ITaskRepository";
import { TaskApi } from "@/modules/tasks/infraestructure/task.api";
import { httpClient } from "@/shared/api/httpClients";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { CommentCard } from "@/shared/components/tasks/CommentCard";
import { InfoCard } from "@/shared/components/tasks/InfoCard";
import { SectionTitle } from "@/shared/components/tasks/SectionTitle";
import { StatusOption } from "@/shared/components/tasks/StatusOption";
import { useComentsTask } from "@/shared/hooks/useCommentsTask";
import { useDetailsTasks } from "@/shared/hooks/useDetailsTasks";
import { useToastStore } from "@/shared/storage/useToastStore";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export default function TaskDetailScreen() {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState("");
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const {
    task_details,
    loading_group,
    error_group,
    reload: reloadTaskDetails,
  } = useDetailsTasks(taskId);

  const {
    comments_task,
    loading_coment,
    error_coment,
    reload: reloadComments,
  } = useComentsTask(taskId);
  const useCase = new TaskUseCase(new TaskApi());
  const user = useAuthStore((s) => s.user);
  const showToast = useToastStore((s) => s.show);


  const sendMessage = async () => {
    const objet: CreateCommentTask = {
      content: note,
      task_id: taskId,
      user_id: user?.id
    }
    const dataSen = await useCase.createCommentTasks(objet);
    if (dataSen.message === "Comentario creado exitosamente") {
      reloadComments();
      setNote("");
      setShowNoteInput(false);
    }

  }
  const getNextStatus = (
    status?: "pending" | "in_progress" | "completed"
  ) => {
    if (status === "pending") return "in_progress";
    if (status === "in_progress") return "completed";
    return null;
  };
  const [updatingStatus, setUpdatingStatus] = useState(false);
  type TaskStatus = "pending" | "in_progress" | "completed";
  const handleNextStatus = async () => {
    const nextStatus = getNextStatus(task_details?.status as TaskStatus);

    if (!nextStatus || !taskId || updatingStatus) return;

    try {
      setUpdatingStatus(true);

      await httpClient.put(`/tasks/${taskId}/status`, {
        status: nextStatus,
      });
      showToast("Estado actualizado correctamente", "success");

      await reloadTaskDetails();
      await reloadComments();
    } catch (error) {
      showToast("Error actualizando estado", "error");
    } finally {
      setUpdatingStatus(false);
    }
  };
  const priority =
    priorityConfig[
    (task_details?.priority as "low" | "medium" | "high") ?? "medium"
    ];
  return (
    <ScreenContainer noPadding>
      <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <View
          style={{
            height: 64,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
            borderBottomWidth: 1,
            borderBottomColor: "#F1F5F9",
          }}
        >
          <TouchableOpacity onPress={() => router.replace("/(main)/tasks")}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>

          <Text style={{ fontSize: 18, fontWeight: "800", color: "#111827" }}>
            Detalle de Tarea
          </Text>

          <Ionicons name="ellipsis-vertical" size={22} color="#111827" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 26,
            paddingTop: 24,
            paddingBottom: 130,
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              backgroundColor: priority.background,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                color: priority.color,
                fontWeight: "900",
                fontSize: 12,
              }}
            >
              {priority.label}
            </Text>
          </View>

          <Text
            style={{
              fontSize: 30,
              lineHeight: 37,
              fontWeight: "900",
              color: "#111827",
              letterSpacing: -0.8,
              marginBottom: 28,
            }}
          >
            {task_details?.title}
          </Text>

          <SectionTitle title="ESTADO ACTUAL" />

          {/* Dependiendo del estado mostrar en cual va y poder dar click al siguiente y no hacia atras */}
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#F8FAFC",
              borderRadius: 14,
              padding: 4,
              marginBottom: 34,
            }}
          >
            <StatusOption active={task_details?.status === "pending"} icon="time-outline" label="PENDIENTE" />
            <StatusOption active={task_details?.status === "in_progress"} icon="sync-outline" label="EN PROCESO" />
            <StatusOption active={task_details?.status === "completed"} icon="checkmark-circle-outline" label="COMPLETADA" />
          </View>
          {task_details?.status !== "completed" && (
            <TouchableOpacity
              activeOpacity={0.85}
              disabled={updatingStatus}
              onPress={handleNextStatus}
              style={{
                height: 52,
                borderRadius: 14,
                backgroundColor: "#FA541C",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 34,
                opacity: updatingStatus ? 0.7 : 1,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 15,
                  fontWeight: "900",
                }}
              >
                {updatingStatus
                  ? "Actualizando..."
                  : task_details?.status === "pending"
                    ? "Iniciar tarea"
                    : "Marcar como completada"}
              </Text>
            </TouchableOpacity>
          )}
          <View style={{ flexDirection: "row", gap: 16, marginBottom: 34 }}>
            <InfoCard
              iconType="avatar"
              label="RESPONSABLE"
              value={task_details?.assigned_to_name}
            />

            <InfoCard
              icon="calendar-outline"
              label="VENCIMIENTO"
              value={task_details?.due_date}
            />
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
              color: "#111827",
              marginBottom: 14,
            }}
          >
            Descripción
          </Text>

          <Text
            style={{
              fontSize: 16,
              lineHeight: 27,
              color: "#475569",
              marginBottom: 34,
            }}
          >
            {task_details?.description}

          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "900", color: "#111827" }}>
              Notas y Comentarios
            </Text>

            <TouchableOpacity onPress={() => setShowNoteInput(true)}>
              <Text style={{ color: "#FA541C", fontWeight: "800", fontSize: 14 }}>
                + Añadir
              </Text>
            </TouchableOpacity>
          </View>
          {showNoteInput && (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 14,
                borderWidth: 1,
                borderColor: "#FED7C3",
                padding: 14,
                marginBottom: 16,
              }}
            >
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="Escribe una nota o comentario..."
                placeholderTextColor="#94A3B8"
                multiline
                textAlignVertical="top"
                style={{
                  minHeight: 90,
                  fontSize: 15,
                  color: "#111827",
                  padding: 0,
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginTop: 14,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    setNote("");
                    setShowNoteInput(false);
                  }}
                  style={{
                    flex: 1,
                    height: 44,
                    borderRadius: 999,
                    backgroundColor: "#FDE9E2",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#FA541C",
                      fontWeight: "800",
                    }}
                  >
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    sendMessage();
                  }}
                  style={{
                    flex: 1,
                    height: 44,
                    borderRadius: 999,
                    backgroundColor: "#FA541C",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "800",
                    }}
                  >
                    Guardar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={{ gap: 14 }}>
            {comments_task?.map((comme) => (
              <CommentCard
                highlighted
                key={comme.id}
                text={comme.content}
                meta={comme.created_at}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

const priorityConfig = {
  low: {
    label: "PRIORIDAD BAJA",
    background: "#ECFDF3",
    color: "#16A34A",
  },

  medium: {
    label: "PRIORIDAD MEDIA",
    background: "#FFF7E6",
    color: "#D97706",
  },

  high: {
    label: "PRIORIDAD ALTA",
    background: "#FFECE5",
    color: "#FA541C",
  },
};




