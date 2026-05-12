import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "react-native-paper";

export function TaskCard({
    title,
    description,
    status,
}: {
    title: string;
    description: string;
    status: "Pendiente" | "En proceso" | "Completada";
}) {
    const statusConfig = {
        Pendiente: {
            color: "#A16207",
            bg: "#FEF3C7",
            icon: "#F59E0B",
        },
        "En proceso": {
            color: "#1D4ED8",
            bg: "#DBEAFE",
            icon: "#3B82F6",
        },
        Completada: {
            color: "#15803D",
            bg: "#DCFCE7",
            icon: "#22C55E",
        },
    };

    const config = statusConfig[status];

    return (
        <View
            style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 24,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",

                shadowColor: "#000",
                shadowOpacity: 0.03,
                shadowRadius: 10,
                shadowOffset: {
                    width: 0,
                    height: 4,
                },

                elevation: 1,
            }}
        >
            {/* ICON */}

            <View
                style={{
                    width: 58,
                    height: 58,
                    borderRadius: 18,
                    backgroundColor: config.bg,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 14,
                }}
            >
                <Ionicons
                    name="clipboard-outline"
                    size={26}
                    color={config.icon}
                />
            </View>

            {/* CONTENT */}

            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "700",
                        color: "#0F172A",
                    }}
                >
                    {title}
                </Text>

                <Text
                    style={{
                        marginTop: 2,
                        fontSize: 14,
                        color: "#94A3B8",
                        fontWeight: "500",
                    }}
                >
                    {description}
                </Text>
            </View>

            {/* BADGE */}

            <View
                style={{
                    backgroundColor: config.bg,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                }}
            >
                <Text
                    style={{
                        color: config.color,
                        fontWeight: "700",
                        fontSize: 12,
                    }}
                >
                    {status.toUpperCase()}
                </Text>
            </View>
        </View>
    );
}