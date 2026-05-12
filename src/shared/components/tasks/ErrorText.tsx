import { Text } from "react-native-paper";

export function ErrorText({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <Text
      style={{
        color: "#EF4444",
        fontSize: 12,
        marginTop: 6,
        fontWeight: "600",
      }}
    >
      {text}
    </Text>
  );
}
