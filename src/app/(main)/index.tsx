// app/(main)/index.tsx
import { ScrollView, View } from "react-native";

import {
  Text
} from "react-native-paper";

import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { SectionHeader } from "@/shared/components/home/SectionHeader";
import { StatusCard } from "@/shared/components/home/StatusCard";
import { TaskCard } from "@/shared/components/home/TaskCard";
import { useTasks } from "@/shared/hooks/useTask";


export default function HomeScreen() {

  const user = useAuthStore((s) => s.user);

  const { tasks, loading, error } = useTasks(user?.id);


  const MAX_VISIBLE_TASKS = 3;
  const TASK_CARD_HEIGHT = 110;

  const shouldScroll = tasks.length > MAX_VISIBLE_TASKS;
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>

      <Text
        variant="headlineMedium"
        style={{ fontWeight: "700" }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        ¡Hola, {user?.name ?? "Usuario"}!
      </Text>

      <Text
        variant="bodyMedium"
        style={{ color: "#7A7A7A", marginTop: 4 }}
      >
        Tienes 5 tareas pendientes
      </Text>


      <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
        <StatusCard
          title="Pendientes"
          count={3}
          color="#FEF9C3"
          colorBorder="#FEF08A"
          colorText="#A16207"
        //  icon="time-outline"
        />
        <StatusCard
          title="En proceso"
          count={2}
          color="#DBEAFE"
          colorBorder="#BFDBFE"
          colorText="#1D4ED8"
        />
        <StatusCard
          title="Completados"
          count={5}
          color="#DCFCE7"
          colorBorder="#BBF7D0"
          colorText="#15803D"
        />
      </View>

      <SectionHeader title="Mis tareas" />


      {loading && <Text>Cargando tareas...</Text>}

      {error && <Text>{error}</Text>}

      {!loading && tasks.length === 0 && (
        <Text>No tienes tareas asignadas</Text>
      )}


      <View
        style={{
          maxHeight: TASK_CARD_HEIGHT * MAX_VISIBLE_TASKS,
        }}
      >
        <ScrollView
          scrollEnabled={shouldScroll}
          showsVerticalScrollIndicator={shouldScroll}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              status="Pendiente"
            />
          ))}
        </ScrollView>
      </View>
      <SectionHeader title="Pendientes familiares" />


      {loading && <Text>Cargando tareas...</Text>}

      {error && <Text>{error}</Text>}

      {!loading && tasks.length === 0 && (
        <Text>No tienes tareas asignadas</Text>
      )}


      <View
        style={{
          maxHeight: TASK_CARD_HEIGHT * MAX_VISIBLE_TASKS,
        }}
      >
        <ScrollView
          scrollEnabled={shouldScroll}
          showsVerticalScrollIndicator={shouldScroll}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              status="Pendiente"
            />
          ))}
        </ScrollView>
      </View>

    </ScrollView>
  );
}


