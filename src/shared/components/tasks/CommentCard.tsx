
import { formatDateEs } from "@/shared/ultis/formatDate";
import { View } from "react-native";
import { Text } from "react-native-paper";

export  function CommentCard({
  text,
  meta,
  highlighted = false,
}: {
  text: string;
  meta: string;
  highlighted?: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: "#F8FAFC",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderLeftWidth: highlighted ? 4 : 0,
        borderLeftColor: "#FA541C",
      }}
    >
      <Text style={{ fontSize: 15, lineHeight: 22, color: "#475569" }}>
        {text}
      </Text>

      <Text
        style={{
          marginTop: 8,
          fontSize: 11,
          color: "#94A3B8",
          fontWeight: "700",
        }}
      >
        {formatDateEs(meta)}
      </Text>
    </View>
  );
}