import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { PriorityFilter } from "@/shared/components/tasks/PriorityFilter";
import { TaskRow } from "@/shared/components/tasks/TaskRow";
import { useTasks } from "@/shared/hooks/useTask";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

const STATUS = ["Todos", "Pendiente", "En proceso", "Completada"];

export default function TasksScreen() {
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const user = useAuthStore((s) => s.user);
  const { tasks, loading, error } = useTasks(user?.id);

  return (
    <ScreenContainer>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          {/* Search */}
          <View
            style={{
              height: 48,
              borderRadius: 14,
              backgroundColor: "#F7F7F8",
              paddingHorizontal: 14,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
              marginBottom: 14,
            }}
          >
            <Ionicons name="search-outline" size={22} color="#94A3B8"

            />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar tareas..."
              placeholderTextColor="#A8B3C7"
              style={{
                flex: 1,
                marginLeft: 8,
                fontSize: 15,
                color: "#111827",
                fontWeight: "500",
                paddingVertical: 0,
              }}
            />
          </View>

          {/* Status filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 8,
              paddingBottom: 26,
            }}
          >
            {STATUS.map((status) => {
              const active = statusFilter === status;

              return (
                <Pressable
                  key={status}
                  onPress={() => setStatusFilter(status)}
                  style={{
                    height: 36,
                    paddingHorizontal: 18,
                    borderRadius: 999,
                    backgroundColor: active ? "#FA541C" : "#F4F4F5",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: active ? "#FFFFFF" : "#334155",
                      fontSize: 13,
                      fontWeight: "700",
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

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
            <PriorityFilter label="Prioridad Alta" />
            <PriorityFilter label="Prioridad Media" />
          </View>

          {/* Tasks */}


          <View style={{ gap: 14 }}>

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

            {/* 
            <TaskRow
              title="Pagar factura de luz"
              date="COMPLETADA"
              status="Completada"
              disabled
            />

            <TaskRow
              title="Organizar despensa de cocina"
              date="MAÑANA"
              tag="INTERIOR"
              status="Pendiente"
            />

            <TaskRow
              title="Reparar grifo baño principal"
              date="EN PROCESO"
              status="En proceso"
              highlighted
            /> */}
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



