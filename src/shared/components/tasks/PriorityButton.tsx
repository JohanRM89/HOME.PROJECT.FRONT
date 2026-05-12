import {
    Pressable,

    View,
} from "react-native";
import { Text } from "react-native-paper";

export function PriorityButton({
  label,
  active,
  color,
  onPress,
}: {
  label: string;
  value: "low" | "medium" | "high";
  active: boolean;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        height: 48,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: active ? "#FA541C" : "#FED7C3",
        backgroundColor: active ? "#FFF1E8" : "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
      }}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          backgroundColor: color,
        }}
      />

      <Text
        style={{
          color: active ? "#FA541C" : "#475569",
          fontWeight: "800",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}