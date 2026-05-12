import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export function TaskRow({
  title,
  date,
  tag,
  status,
  disabled = false,
  highlighted = false,
  onPress,
}: {
  title: string;
  date: string;
  tag?: string;
  status: "Pendiente" | "En proceso" | "Completada";
  disabled?: boolean;
  highlighted?: boolean;
  onPress?: () => void;
}) {
  const isCompleted = status === "Completada";
  const isProgress = status === "En proceso";

  return (
  <Pressable
    onPress={onPress}
    style={{
      minHeight: 78,
      backgroundColor: "#FFFFFF",
      borderRadius: 14,
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: "#EEF2F7",
      flexDirection: "row",
      alignItems: "center",

      shadowColor: "#000",
      shadowOpacity: 0.03,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 1,
    }}
  >
      {highlighted && (
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            borderTopLeftRadius: 14,
            borderBottomLeftRadius: 14,
            backgroundColor: "#FA541C",
          }}
        />
      )}

      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 999,
          borderWidth: isCompleted ? 0 : 2,
          borderColor: isProgress ? "#FA541C" : "#CBD5E1",
          backgroundColor: isCompleted ? "#FA541C" : "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 14,
        }}
      >
        {isCompleted && (
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        )}

        {isProgress && (
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 999,
              backgroundColor: "#FA541C",
            }}
          />
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "800",
            color: disabled ? "#94A3B8" : "#111827",
            textDecorationLine: disabled ? "line-through" : "none",
          }}
        >
          {title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginTop: 6,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: "800",
              color: isProgress
                ? "#FA541C"
                : isCompleted
                  ? "#94A3B8"
                  : "#EF4444",
            }}
          >
            {date}
          </Text>

          {tag && (
            <View
              style={{
                backgroundColor: tag === "INTERIOR" ? "#DBEAFE" : "#FED7C3",
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "800",
                  color: tag === "INTERIOR" ? "#2563EB" : "#FA541C",
                }}
              >
                {tag}
              </Text>
            </View>
          )}
        </View>
      </View>

      {isCompleted && (
        <Ionicons name="trash-outline" size={22} color="#94A3B8" />
      )}
    </Pressable>
  );
}