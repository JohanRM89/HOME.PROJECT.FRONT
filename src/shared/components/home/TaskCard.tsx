import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Card, Chip, Text } from "react-native-paper";

export function TaskCard({
    title,
    description,
    status,
}: {
    title: string;
    description: string;
    status: "Pendiente" | "En proceso" | "Completado";
}) {
    const statusColor =
        status === "Pendiente"
            ? "#F2B705"
            : status === "En proceso"
                ? "#1E88E5"
                : "#2E7D32";

    return (
        <Card style={{ marginBottom: 12 }}>
            <Card.Content style={{ flexDirection: "row", gap: 12 }}>
                <Ionicons name="clipboard-outline" size={28} color={statusColor} />
                <View style={{ flex: 1 }}>
                    <Text variant="titleMedium">{title}</Text>
                    <Text variant="bodyMedium">{description}</Text>

                    <View style={{ marginTop: 6, alignSelf: "flex-start" }}>
                        <Chip>{status}</Chip>
                    </View>
                </View>
            </Card.Content>
        </Card>
    );
}
