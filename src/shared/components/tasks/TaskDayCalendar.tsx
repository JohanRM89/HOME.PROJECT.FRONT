import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { Text } from "react-native-paper";

type TaskStatus = "Pendiente" | "En proceso" | "Completada";

export function TaskDayCard({
  title,
  time,
  status,
  icon,
  bg,
  color,
  category,
  onPress,
}: {
  title: string;
  time: string;
  status: TaskStatus;
  icon: keyof typeof Ionicons.glyphMap;
  bg: string;
  color: string;
  category?: string;
  onPress?: () => void;
}) {
  const statusConfig = {
    Pendiente: {
      bg: "#FEF3C7",
      color: "#A16207",
    },

    "En proceso": {
      bg: "#DBEAFE",
      color: "#1D4ED8",
    },

    Completada: {
      bg: "#DCFCE7",
      color: "#15803D",
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <Pressable
      onPress={onPress}
      style={{
        minHeight: 92,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        borderWidth: 1.5,
        borderColor: `${color}40`,
        borderLeftWidth: 5,
        borderLeftColor: color,
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 10,
        shadowOffset: {
          width: 0,
          height: 4,
        },

        elevation: 1,
      }}
    >
      {/* ICON */}

      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          backgroundColor: bg,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 16,
        }}
      >
        <Ionicons name={icon} size={26} color={color} />
      </View>

      {/* CONTENT */}

      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
            fontWeight: "900",
            color: "#111827",
          }}
        >
          {title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 8,
          }}
        >
          {/* TIME */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Ionicons
              name="time-outline"
              size={13}
              color="#94A3B8"
            />

            <Text
              style={{
                fontSize: 12,
                fontWeight: "800",
                color: "#64748B",
              }}
            >
              {time}
            </Text>
          </View>

          {/* CATEGORY */}

          {category && (
            <View
              style={{
                backgroundColor: `${color}18`,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 999,
              }}
            >
              <Text
                style={{
                  color,
                  fontSize: 10,
                  fontWeight: "900",
                }}
              >
                {category.toUpperCase()}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* STATUS */}

      <View
        style={{
          alignItems: "flex-end",
          gap: 10,
        }}
      >
        <View
          style={{
            backgroundColor: currentStatus.bg,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 999,
          }}
        >
          <Text
            style={{
              color: currentStatus.color,
              fontSize: 10,
              fontWeight: "900",
            }}
          >
            {status.toUpperCase()}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={18}
          color="#CBD5E1"
        />
      </View>
    </Pressable>
  );
}