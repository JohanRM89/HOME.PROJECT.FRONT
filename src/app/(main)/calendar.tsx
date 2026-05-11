import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Button, Card, Chip, Text } from "react-native-paper";

const WEEK_DAYS = ["L", "M", "M", "J", "V", "S", "D"];

export default function CalendarScreen() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);

  // Mock tareas por fecha
  const tasksForDate: Record<string, any[]> = {
    // example: "2026-04-28": [...]
  };

  const dateKey = selectedDate.toISOString().split("T")[0];
  const tasks = tasksForDate[dateKey] || [];

  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();

  const monthName = selectedDate.toLocaleString("es-ES", {
    month: "long",
    year: "numeric",
  });

  return (
    <ScreenContainer>

      <ScrollView >
        {/* TÍTULO */}
        <Text variant="headlineMedium" style={{ textAlign: "center" }}>
          Calendario
        </Text>

        {/* MES */}
        <Text
          variant="titleLarge"
          style={{ textAlign: "center", marginVertical: 12 }}
        >
          {monthName}
        </Text>

        {/* DÍAS DE LA SEMANA */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {WEEK_DAYS.map((day, index) => (
            <Text key={index} style={{ width: 32, textAlign: "center" }}>
              {day}
            </Text>
          ))}
        </View>

        {/* CALENDARIO */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 8,
          }}
        >
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const date = new Date(
              today.getFullYear(),
              today.getMonth(),
              day
            );

            const isSelected =
              date.toDateString() === selectedDate.toDateString();

            return (
              <Pressable
                key={day}
                onPress={() => setSelectedDate(date)}
                style={{
                  width: "14.2%",
                  paddingVertical: 10,
                  alignItems: "center",
                  borderRadius: 20,
                  backgroundColor: isSelected ? "#FF6B35" : "transparent",
                }}
              >
                <Text style={{ color: isSelected ? "white" : "black" }}>
                  {day}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* TAREAS DEL DÍA */}
        <Text variant="titleMedium" style={{ marginTop: 24 }}>
          Tareas del día
        </Text>

        {tasks.length === 0 ? (
          <View
            style={{
              marginTop: 16,
              alignItems: "center",
            }}
          >
            <Ionicons
              name="calendar-outline"
              size={48}
              color="#999"
              style={{ marginBottom: 12 }}
            />
            <Text style={{ marginBottom: 12 }}>
              No hay tareas para esta fecha
            </Text>

            <Button
              mode="contained"
              onPress={() => console.log("Crear tarea")}
            >
              Crear tarea
            </Button>
          </View>
        ) : (
          tasks.map((task, index) => (
            <Card key={index} style={{ marginTop: 12 }}>
              <Card.Content>
                <Text variant="titleMedium">{task.title}</Text>
                <Text>{task.description}</Text>

                <Chip style={{ alignSelf: "flex-start", marginTop: 8 }}>
                  {task.status}
                </Chip>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>
    </ScreenContainer>

  );
}