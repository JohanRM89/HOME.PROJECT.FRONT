import { View } from "react-native";
import { Text } from "react-native-paper";

interface Props {
    title: string;
    count?: number;
    color: string;
    colorText: string;
}

export function StatusCard({
    title,
    count,
    color,
    colorText,
}: Props) {
    return (
        <View
            style={{
                width: 150,
                height: 120,
                backgroundColor: color,
                borderRadius: 24,
                padding: 18,
                justifyContent: "space-between",
            }}
        >
            <Text
                style={{
                    color: colorText,
                    fontSize: 17,
                    fontWeight: "600",
                }}
            >
                {title}
            </Text>

            <Text
                style={{
                    color: colorText,
                    fontSize: 42,
                    fontWeight: "800",
                    letterSpacing: -2,
                }}
            >
                {count}
            </Text>
        </View>
    );
}