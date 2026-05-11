
import { StatusCardProps } from "@/modules/tasks/domain/ITaskRepository";
import { Card, Text } from "react-native-paper";




export function StatusCard({
    title,
    count,
    color,
    colorBorder,
    colorText,

}: StatusCardProps) {
    return (
        <Card style={{ flex: 1, backgroundColor: color, borderColor: colorBorder, borderWidth: 1, borderRadius: 16 }}>
            <Card.Content style={{ alignItems: "flex-start", gap: 8 }}>
                <Text style={{ color: colorText }}>{title}</Text>
                <Text style={{ color: colorText, fontWeight: "700" }} variant="titleLarge">{count}</Text>
            </Card.Content>
        </Card>
    );
}
