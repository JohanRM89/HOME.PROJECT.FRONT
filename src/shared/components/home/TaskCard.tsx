import { formatDateEs } from "@/shared/ultis/formatDate";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";

type TaskStatus = "Pendiente" | "En proceso" | "Completada";
type TaskPriority = "low" | "medium" | "high";

export function TaskCard({
  title,
  description,
  status,
  dueDate,
  categoryName,
  categoryIcon,
  categoryColor,
  assignedToName,
  priority,
  points,
  onPress,
}: {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate?: string | null;
  categoryName?: string;
  categoryIcon?: keyof typeof Ionicons.glyphMap;
  categoryColor?: string;
  assignedToName?: string;
  priority?: TaskPriority;
  points?: number;
  onPress?: () => void;
}) {
  const statusConfig = {
    Pendiente: {
      color: "#A16207",
      bg: "#FEF3C7",
      icon: "#F59E0B",
    },
    "En proceso": {
      color: "#1D4ED8",
      bg: "#DBEAFE",
      icon: "#3B82F6",
    },
    Completada: {
      color: "#15803D",
      bg: "#DCFCE7",
      icon: "#22C55E",
    },
  };

  const priorityConfig = {
    low: {
      label: "Baja",
      color: "#16A34A",
      bg: "#ECFDF3",
    },
    medium: {
      label: "Media",
      color: "#D97706",
      bg: "#FFF7E6",
    },
    high: {
      label: "Alta",
      color: "#FA541C",
      bg: "#FFECE5",
    },
  };

  const config = statusConfig[status];
  const priorityInfo = priority ? priorityConfig[priority] : null;

  const color = categoryColor ?? config.icon;
  const icon = categoryIcon ?? "clipboard-outline";

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 16,
        borderWidth: 1.5,
        borderColor: `${color}55`,
        borderLeftWidth: 5,
        borderLeftColor: color,
        flexDirection: "row",
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.035,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 1,
      }}
    >
      <View
        style={{
          width: 58,
          height: 58,
          borderRadius: 18,
          backgroundColor: `${color}22`,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 14,
        }}
      >
        <Ionicons name={icon} size={27} color={color} />
      </View>

      <View style={{ flex: 1, paddingRight: 10 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: 18,
            fontWeight: "900",
            color: "#0F172A",
          }}
        >
          {title}
        </Text>

        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            marginTop: 3,
            fontSize: 13,
            lineHeight: 18,
            color: "#64748B",
            fontWeight: "500",
          }}
        >
          {description}
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 6,
            marginTop: 10,
          }}
        >
          <MiniBadge
            icon="calendar-outline"
            label={formatDateEs(dueDate)}
            bg="#F8FAFC"
            color="#64748B"
          />

          {categoryName && (
            <MiniBadge
              icon={icon}
              label={categoryName}
              bg={`${color}18`}
              color={color}
            />
          )}

          {assignedToName && (
            <MiniBadge
              icon="person-outline"
              label={assignedToName}
              bg="#F8FAFC"
              color="#64748B"
            />
          )}
        </View>
      </View>

      <View style={{ alignItems: "flex-end", gap: 8 }}>
        <View
          style={{
            backgroundColor: config.bg,
            paddingHorizontal: 10,
            paddingVertical: 7,
            borderRadius: 999,
          }}
        >
          <Text
            style={{
              color: config.color,
              fontWeight: "900",
              fontSize: 10,
            }}
          >
            {status.toUpperCase()}
          </Text>
        </View>

        {priorityInfo && (
          <View
            style={{
              backgroundColor: priorityInfo.bg,
              paddingHorizontal: 9,
              paddingVertical: 5,
              borderRadius: 999,
            }}
          >
            <Text
              style={{
                color: priorityInfo.color,
                fontSize: 10,
                fontWeight: "900",
              }}
            >
              {priorityInfo.label}
            </Text>
          </View>
        )}

        {typeof points === "number" && (
          <Text
            style={{
              color: "#FA541C",
              fontSize: 12,
              fontWeight: "900",
            }}
          >
            +{points} pts
          </Text>
        )}
      </View>
    </Pressable>
  );
}

function MiniBadge({
  icon,
  label,
  bg,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  bg: string;
  color: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: bg,
        borderRadius: 999,
        paddingHorizontal: 8,
        paddingVertical: 4,
        gap: 4,
      }}
    >
      <Ionicons name={icon} size={12} color={color} />

      <Text
        numberOfLines={1}
        style={{
          color,
          fontSize: 10,
          fontWeight: "800",
          maxWidth: 95,
        }}
      >
        {label}
      </Text>
    </View>
  );
}