import { View } from "react-native";
import { Text } from "react-native-paper";

export function SectionHeader({
    title,
}: {
    title: string;
}) {
    return (
        <View
            style={{
                marginTop: 34,
                marginBottom: 18,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    fontSize: 30,
                    fontWeight: "800",
                    color: "#111827",
                    letterSpacing: -1,
                }}
            >
                {title}
            </Text>

            {/* <Text
                style={{
                    color: "#F97316",
                    fontWeight: "700",
                    fontSize: 16,
                }}
            >
                Ver todo
            </Text> */}
        </View>
    );
}