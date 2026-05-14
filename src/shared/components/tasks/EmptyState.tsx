import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
export function EmptyState() {
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
