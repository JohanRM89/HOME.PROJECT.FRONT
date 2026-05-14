import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export function MonthButton({
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
