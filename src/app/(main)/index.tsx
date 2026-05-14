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


export default function HomeScreen() {

  const user = useAuthStore((s) => s.user);
  const memberid = useAuthStore((s) => s.memberid);

  const { tasks, loading, error } = useTasks(user?.id);
  const { tasks_group, loading_group, error_group } = useTasksGroups(memberid);
  const {error_reports,loading_reports,reload,reports } = useReportsOne(memberid);
  const MAX_VISIBLE_TASKS = 3;
  const TASK_CARD_HEIGHT = 110;

  const shouldScroll = tasks.length > MAX_VISIBLE_TASKS;
  return (
    <ScreenContainer>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#FAFAFA",
        }}

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
            count={reports?.data[0].pending_tasks}
            color="#FFF7CC"
            colorText="#A16207"
          />

          <StatusCard
            title="En proceso"
            count={reports?.data[0].in_progress_tasks}
            color="#DDEBFF"
            colorText="#1D4ED8"
          />

          <StatusCard
            title="Completadas"
            count={reports?.data[0].completed_tasks}
            color="#DCFCE7"
            colorText="#15803D"
          />
        </ScrollView>

        {/* TASKS */}

        <SectionHeader title="Mis tareas hoy" />

        <View style={{ gap: 14 }}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status === "pending" ? "Pendiente" : task.status === "in_progress" ? "En proceso" : "Completada"}
            />

          ))}
        </View>

        {/* FAMILY */}

        <SectionHeader title="Pendientes familia" />

        <View style={{ gap: 14 }}>
          {tasks_group.map((task) => (
            <TaskCard
              key={`family-${task.id}`}
              title={task.title}
              description={task.description}
              status={task.status === "pending" ? "Pendiente" : task.status === "in_progress" ? "En proceso" : "Completada"}
            />
          ))}
        </View>
      </ScrollView>

    </ScreenContainer>

  );
}


