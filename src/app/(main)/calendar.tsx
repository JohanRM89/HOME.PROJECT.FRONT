import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

const WEEK_DAYS = ["LU", "MA", "MI", "JU", "VI", "SÁ", "DO"];

const mockTasks: Record<string, any[]> = {
  "2026-10-05": [
    {
      title: "Limpiar la cocina",
      time: "08:00 AM",
      status: "Completada",
      icon: "checkmark-circle-outline",
      bg: "#DCFCE7",
      color: "#16A34A",
    },
    {
      title: "Organizar el salón",
      time: "10:30 AM",
      status: "En proceso",
      icon: "brush-outline",
      bg: "#DBEAFE",
      color: "#2563EB",
    },
    {
      title: "Compras semanales",
      time: "04:00 PM",
      status: "Pendiente",
      icon: "cart-outline",
      bg: "#FEF3C7",
      color: "#D97706",
    },
  ],
};

export default function CalendarScreen() {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today);
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const selectedKey = formatDateKey(selectedDate);
  const tasks = mockTasks[selectedKey] || [];

  const monthName = visibleMonth.toLocaleString("es-ES", {
    month: "long",
    year: "numeric",
  });

  const calendarDays = useMemo(() => {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const startOffset = (firstDay.getDay() + 6) % 7;

    return [
      ...Array.from({ length: startOffset }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => {
        return new Date(year, month, index + 1);
      }),
    ];
  }, [visibleMonth]);

  const changeMonth = (direction: "prev" | "next") => {
    setVisibleMonth((prev) => {
      return new Date(
        prev.getFullYear(),
        prev.getMonth() + (direction === "next" ? 1 : -1),
        1
      );
    });
  };

  return (
    <ScreenContainer noPadding>
      <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        {/* Header */}
        <View
          style={{
            height: 68,
            backgroundColor: "#FFFFFF",
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#F1F5F9",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: "900", color: "#111827" }}>
            Calendario
          </Text>

          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color="#334155" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 18,
            paddingBottom: 120,
          }}
        >
          {/* Month */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 22,
            }}
          >
            <MonthButton icon="chevron-back" onPress={() => changeMonth("prev")} />

            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "900",
                  color: "#111827",
                  textTransform: "capitalize",
                }}
              >
                {monthName}
              </Text>

              <Text style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>
                Hoy es {today.getDate()} de{" "}
                {today.toLocaleString("es-ES", { month: "long" })}
              </Text>
            </View>

            <MonthButton icon="chevron-forward" onPress={() => changeMonth("next")} />
          </View>

          {/* Calendar card */}
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#EEF2F7",
              paddingHorizontal: 16,
              paddingVertical: 20,
              marginBottom: 28,
            }}
          >
            <View style={{ flexDirection: "row", marginBottom: 18 }}>
              {WEEK_DAYS.map((day) => (
                <Text
                  key={day}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "900",
                    color: "#94A3B8",
                  }}
                >
                  {day}
                </Text>
              ))}
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {calendarDays.map((date, index) => {
                if (!date) {
                  return <View key={`empty-${index}`} style={{ width: "14.28%", height: 44 }} />;
                }

                const isSelected =
                  formatDateKey(date) === formatDateKey(selectedDate);

                const isToday =
                  formatDateKey(date) === formatDateKey(today);

                const hasTasks = Boolean(mockTasks[formatDateKey(date)]?.length);

                return (
                  <Pressable
                    key={formatDateKey(date)}
                    onPress={() => setSelectedDate(date)}
                    style={{
                      width: "14.28%",
                      height: 44,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 4,
                    }}
                  >
                    <View
                      style={{
                        width: 46,
                        height: 40,
                        borderRadius: 10,
                        backgroundColor: isSelected ? "#FA541C" : "transparent",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: isSelected || isToday ? "900" : "600",
                          color: isSelected ? "#FFFFFF" : "#111827",
                        }}
                      >
                        {date.getDate()}
                      </Text>

                      {hasTasks && (
                        <View
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: 999,
                            backgroundColor: isSelected ? "#FFFFFF" : "#FA541C",
                            marginTop: 3,
                          }}
                        />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Tasks title */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "900", color: "#111827" }}>
              Tareas del día seleccionado
            </Text>

            <View
              style={{
                backgroundColor: "#FFECE5",
                borderRadius: 999,
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Text style={{ color: "#FA541C", fontSize: 12, fontWeight: "800" }}>
                {selectedDate.toLocaleString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
          </View>

          {tasks.length === 0 ? (
            <EmptyState />
          ) : (
            <View style={{ gap: 14 }}>
              {tasks.map((task, index) => (
                <CalendarTaskRow key={index} {...task} />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

function MonthButton({
  icon,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name={icon} size={20} color="#FA541C" />
    </TouchableOpacity>
  );
}

function CalendarTaskRow({
  title,
  time,
  status,
  icon,
  bg,
  color,
}: {
  title: string;
  time: string;
  status: string;
  icon: keyof typeof Ionicons.glyphMap;
  bg: string;
  color: string;
}) {
  return (
    <Pressable
      style={{
        minHeight: 82,
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          backgroundColor: bg,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 16,
        }}
      >
        <Ionicons name={icon} size={25} color={color} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 17, fontWeight: "900", color: "#111827" }}>
          {title}
        </Text>

        <Text style={{ fontSize: 15, color: "#64748B", marginTop: 2 }}>
          {time} • {status}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={22} color="#CBD5E1" />
    </Pressable>
  );
}

function EmptyState() {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        padding: 24,
        alignItems: "center",
      }}
    >
      <Ionicons name="calendar-outline" size={42} color="#94A3B8" />

      <Text
        style={{
          marginTop: 12,
          fontSize: 16,
          color: "#64748B",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        No hay tareas para esta fecha
      </Text>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => router.push("/(details)/create_tasks")}
        style={{
          marginTop: 16,
          height: 44,
          paddingHorizontal: 22,
          borderRadius: 999,
          backgroundColor: "#FA541C",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontWeight: "900" }}>
          Crear tarea
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}