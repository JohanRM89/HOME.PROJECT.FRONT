// app/(main)/index.tsx
import { ScrollView, View } from "react-native";

import {
  Text
} from "react-native-paper";

import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { SectionHeader } from "@/shared/components/home/SectionHeader";
import { StatusCard } from "@/shared/components/home/StatusCard";
import { TaskCard } from "@/shared/components/home/TaskCard";
import { useReportsOne } from "@/shared/hooks/useReportsOne";
import { useTasksGroups } from "@/shared/hooks/useTaksGroups";
import { useTasks } from "@/shared/hooks/useTask";
import { Ionicons } from "@expo/vector-icons";


export default function HomeScreen() {

  const user = useAuthStore((s) => s.user);
  const memberid = useAuthStore((s) => s.memberid);

  const { tasks, loading, error } = useTasks(user?.id);
  const { tasks_group, loading_group, error_group } = useTasksGroups(memberid);
  const { error_reports, loading_reports, reload, reports } = useReportsOne(memberid);
  const MAX_VISIBLE_TASKS = 4;
  const TASK_CARD_HEIGHT = 108;

  const shouldScroll = tasks.length > MAX_VISIBLE_TASKS;
  const shouldScrollFamilyTasks = tasks_group.length > MAX_VISIBLE_TASKS;
  return (
    <ScreenContainer>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#FAFAFA",
        }}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 20 }}

        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}

        <View style={{ marginBottom: 28 }}>
          <Text
            style={{
              fontSize: 38,
              fontWeight: "800",
              color: "#111827",
              letterSpacing: -1,
            }}
          >
            ¡Hola, {user?.name ?? "Ana"}!
          </Text>

          <Text
            style={{
              marginTop: 6,
              fontSize: 16,
              color: "#94A3B8",
              fontWeight: "500",
            }}
          >
            Tienes 5 tareas para hoy
          </Text>
        </View>

        {/* STATUS CARDS */}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 14,
            paddingRight: 20,
          }}
        >
          <StatusCard
            title="Pendientes"
            count={reports?.data.length ? reports?.data[0].pending_tasks : 0}
            color="#FFF7CC"
            colorText="#A16207"
          />

          <StatusCard
            title="En proceso"
            count={reports?.data.length ? reports?.data[0].in_progress_tasks : 0}
            color="#DDEBFF"
            colorText="#1D4ED8"
          />

          <StatusCard
            title="Completadas"
            count={reports?.data.length ? reports?.data[0].completed_tasks : 0}
            color="#DCFCE7"
            colorText="#15803D"
          />
        </ScrollView>

        {/* TASKS */}

        <SectionHeader title="Mis tareas" />

        <View
          style={{
            maxHeight: TASK_CARD_HEIGHT * MAX_VISIBLE_TASKS,
          }}
        >
          <ScrollView
            scrollEnabled={shouldScroll}
            showsVerticalScrollIndicator={false}
          >

            {tasks.length === 0 ? (
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
                  No hay tareas por ahora
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    lineHeight: 22,
                    color: "#64748B",
                    textAlign: "center",
                  }}
                >
                  Todo está al día. Cuando tengas nuevas tareas aparecerán aquí.
                </Text>
              </View>
            ) : (
              <ScrollView
                scrollEnabled={shouldScroll}
                showsVerticalScrollIndicator={false}
              >
                <View style={{ gap: 14, paddingRight: 4 }}>
                  {tasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      title={task.title}
                      description={task.description}
                      status={
                        task.status === "pending"
                          ? "Pendiente"
                          : task.status === "in_progress"
                            ? "En proceso"
                            : "Completada"
                      }
                    />
                  ))}
                </View>
              </ScrollView>
            )}
          </ScrollView>
        </View>

        {/* FAMILY */}


        <SectionHeader title="Pendientes familia" />

        <View
          style={{
            maxHeight: TASK_CARD_HEIGHT * MAX_VISIBLE_TASKS,
            paddingBottom: 28,
          }}
        >
          {tasks_group.length === 0 ? (
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
                No hay tareas por ahora
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  lineHeight: 22,
                  color: "#64748B",
                  textAlign: "center",
                }}
              >
                Tu familia aun no tiene tareas asignadas.
              </Text>
            </View>
          ) : (
            <ScrollView
              scrollEnabled={shouldScroll}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ gap: 14, paddingRight: 4 }}>
                {tasks_group.map((task) => (
                  <TaskCard
                    key={`family-${task.id}`}
                    title={task.title}
                    description={task.description}
                    status={
                      task.status === "pending"
                        ? "Pendiente"
                        : task.status === "in_progress"
                          ? "En proceso"
                          : "Completada"
                    }
                  />
                ))}
              </View>
            </ScrollView>
          )}


        </View>
      </ScrollView>

    </ScreenContainer>

  );
}


