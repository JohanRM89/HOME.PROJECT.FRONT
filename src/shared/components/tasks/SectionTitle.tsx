import { Text } from "react-native-paper";

export function SectionTitle({ title }: { title: string }) {
  return (
    <Text
      style={{
        fontSize: 13,
        fontWeight: "900",
        color: "#64748B",
        letterSpacing: 0.7,
        marginBottom: 14,
      }}
    >
      {title}
    </Text>
  );
}