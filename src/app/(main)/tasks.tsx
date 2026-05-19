import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { SearchInput } from "@/shared/components/home/SearchInput";
import { PriorityFilter } from "@/shared/components/tasks/PriorityFilter";
import { TaskRow } from "@/shared/components/tasks/TaskRow";
import { useTasks } from "@/shared/hooks/useTask";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

const STATUS = ["Todos", "Pendiente", "En proceso", "Completada"];

export default function TasksScreen() {
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const user = useAuthStore((s) => s.user);
  const { tasks, loading, error } = useTasks(user?.id);
  const MAX_VISIBLE_TASKS = 5;
  const TASK_CARD_HEIGHT = 108;

  const shouldScroll = tasks.length > MAX_VISIBLE_TASKS;

  const priorityOptions = [
    { label: "Todas", value: "all" },
    { label: "Alta", value: "high" },
    { label: "Media", value: "medium" },
    { label: "Baja", value: "low" },
  ];

  const statusOptions = [
    { label: "Todos", value: "all" },
    { label: "Pendiente", value: "pending" },
    { label: "En proceso", value: "in_progress" },
    { label: "Completada", value: "completed" },
  ];

  const [priority, setPriority] = useState("all");
  const [status, setStatus] = useState("all");
  return (
    <ScreenContainer>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120, paddingTop: 20 }}
        >
          {/* Search */}
          <SearchInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar tareas..."
          />

        
          {/* Priority filters */}
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "#EFEFEF",
              paddingTop: 18,
              marginBottom: 24,
              flexDirection: "row",
              gap: 12,
            }}
          >
            <PriorityFilter label="Prioridad"
              value={priority}
              options={priorityOptions}
              onChange={setPriority}
              icon="flag-outline" />
            <PriorityFilter label="Estado"
              value={status}
              options={statusOptions}
              onChange={setStatus}
              icon="layers-outline" />
          </View>

          {/* Tasks */}


          <View style={{ gap: 14 }}>

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
                  Todo está al día. Cuando tengas nuevas tareas aparecerán aquí.                </Text>
              </View>
            ) : (
              <ScrollView
                scrollEnabled={shouldScroll}
                showsVerticalScrollIndicator={false}
              >
                <View style={{ gap: 14, paddingRight: 4 }}>
                  {tasks.map((task) => (
                    <TaskRow
                      key={task.id}
                      title={task.title}
                      date={task.due_date}
                      status={task.status === "pending" ? "Pendiente" : task.status === "in_progress" ? "En proceso" : "Completada"}
                      onPress={() =>

                        router.push({
                          pathname: "/(details)/tasks_detail",
                          params: { taskId: task.id },
                        })

                      }

                    />
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        </ScrollView>

        {/* Floating button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.replace("/(details)/create_tasks")}

          style={{
            position: "absolute",
            right: 24,
            bottom: 34,

            width: 64,
            height: 64,
            borderRadius: 999,

            backgroundColor: "#FA541C",

            justifyContent: "center",
            alignItems: "center",

            shadowColor: "#FA541C",
            shadowOpacity: 0.35,
            shadowRadius: 14,
            shadowOffset: {
              width: 0,
              height: 8,
            },

            elevation: 10,
          }}
        >
          <Ionicons name="add" size={34} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}



