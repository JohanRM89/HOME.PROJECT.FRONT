import { Ionicons } from "@expo/vector-icons";

type IconName = keyof typeof Ionicons.glyphMap;

export function getNotificationUI(noti: any): {
  icon: IconName;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
} {
  switch (noti.type) {
    case "task_created":
      return {
        icon: "add-circle-outline",
        iconColor: "#3B82F6",
        iconBg: "#E0F2FE",
        title: `${noti.actor_name || "Alguien"} creó una tarea`,
        description: `"${noti.task_title}" fue creada`,
      };

    case "task_assigned":
      return {
        icon: "briefcase-outline",
        iconColor: "#FA541C",
        iconBg: "#FFECE5",
        title: "Nueva tarea asignada",
        description: `Se te asignó: "${noti.task_title}"`,
      };

    case "task_completed":
      return {
        icon: "checkmark-circle-outline",
        iconColor: "#22C55E",
        iconBg: "#DCFCE7",
        title: `${noti.actor_name || "Alguien"} completó una tarea`,
        description: `"${noti.task_title}" fue completada`,
      };

    case "due_date":
      return {
        icon: "notifications-outline",
        iconColor: "#F59E0B",
        iconBg: "#FEF3C7",
        title: "Recordatorio",
        description: `La tarea "${noti.task_title}" vence pronto`,
      };

    case "alert":
      return {
        icon: "alert-circle-outline",
        iconColor: "#EF4444",
        iconBg: "#FEE2E2",
        title: "Alerta",
        description: noti.message,
      };

    case "family":
      return {
        icon: "people-outline",
        iconColor: "#64748B",
        iconBg: "#F1F5F9",
        title: "Actividad familiar",
        description: noti.message,
      };

    case "report":
      return {
        icon: "bar-chart-outline",
        iconColor: "#8B5CF6",
        iconBg: "#EDE9FE",
        title: "Nuevo reporte",
        description: noti.message,
      };

    default:
      return {
        icon: "notifications-outline",
        iconColor: "#94A3B8",
        iconBg: "#F1F5F9",
        title: noti.message,
        description: "",
      };
  }
}
