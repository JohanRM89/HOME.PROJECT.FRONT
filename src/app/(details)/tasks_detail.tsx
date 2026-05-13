import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { TaskUseCase } from "@/modules/tasks/application/task.usecase";
import { CreateCommentTask } from "@/modules/tasks/domain/ITaskRepository";
import { TaskApi } from "@/modules/tasks/infraestructure/task.api";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { CommentCard } from "@/shared/components/tasks/CommentCard";
import { InfoCard } from "@/shared/components/tasks/InfoCard";
import { SectionTitle } from "@/shared/components/tasks/SectionTitle";
import { StatusOption } from "@/shared/components/tasks/StatusOption";
import { useComentsTask } from "@/shared/hooks/useCommentsTask";
import { useDetailsTasks } from "@/shared/hooks/useDetailsTasks";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
export default function TaskDetailScreen() {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState("");
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const { task_details, loading_group, error_group } = useDetailsTasks(taskId);
  const { comments_task, loading_coment, error_coment, reload } = useComentsTask(taskId);
  const useCase = new TaskUseCase(new TaskApi());
  const user = useAuthStore((s) => s.user);


  const sendMessage = async () => {
    const objet: CreateCommentTask = {
      content: note,
      task_id: taskId,
      user_id: user?.id
    }
    const dataSen = await useCase.createCommentTasks(objet);
    if (dataSen.message === "Comentario creado exitosamente") {
      reload();
      setNote("");
      setShowNoteInput(false);
    }

  }
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

          {task_details?.priority === "low" ? (<>
            <View
              style={{
                alignSelf: "flex-start",
                backgroundColor: "#FFECE5",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
                marginBottom: 14,
              }}
            >
              <Text style={{ color: "#FA541C", fontWeight: "900", fontSize: 12 }}>
                PRIORIDAD BAJA
              </Text>
            </View>
          </>) : task_details?.priority === "hight" ? (<>
            <View
              style={{
                alignSelf: "flex-start",
                backgroundColor: "#FFECE5",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
                marginBottom: 14,
              }}
            >
              <Text style={{ color: "#FA541C", fontWeight: "900", fontSize: 12 }}>
                PRIORIDAD ALTA
              </Text>
            </View>
          </>) : (<>
            <View
              style={{
                alignSelf: "flex-start",
                backgroundColor: "#FFECE5",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 999,
                marginBottom: 14,
              }}
            >
              <Text style={{ color: "#FA541C", fontWeight: "900", fontSize: 12 }}>
                PRIORIDAD MEDIA
              </Text>
            </View>
          </>)}


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





