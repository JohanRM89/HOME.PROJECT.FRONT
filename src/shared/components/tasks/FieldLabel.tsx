import { Text } from "react-native-paper";

export function FieldLabel({ label }: { label: string }) {
  return (
    <Text
      style={{
        fontSize: 16,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 10,
        marginTop: 18,
      }}
    >
      {label}
    </Text>
  );
}