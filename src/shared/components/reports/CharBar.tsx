import { View } from "react-native";
import { Text } from "react-native-paper";
export function ChartBar({ name, value }: { name: string; value: number }) {
    return (
        <View style={{ alignItems: "center", flex: 1 }}>
            <View
                style={{
                    height: 145,
                    width: 34,
                    borderRadius: 999,
                    backgroundColor: "#F1F5F9",
                    justifyContent: "flex-end",
                    overflow: "hidden",
                    marginBottom: 14,
                }}
            >
                <View
                    style={{
                        height: `${value}%`,
                        backgroundColor: "#FA541C",
                        borderRadius: 999,
                    }}
                />
            </View>

            <Text style={{ color: "#64748B", fontSize: 12, fontWeight: "800" }}>
                {name}
            </Text>
        </View>
    );
}