import { SectionHeaderProps } from "@/modules/tasks/domain/ITaskRepository";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";


export function SectionHeader({
    title,
    onPress,
}: SectionHeaderProps) {
    return (
        <View
            style={{
                marginTop: 24,
                marginBottom: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Text variant="headlineMedium"
                style={{ fontWeight: "100" }}
                numberOfLines={1}
                ellipsizeMode="tail"


            >{title}</Text>
            {onPress && (
                <IconButton
                    icon="chevron-right"
                    size={22}
                    onPress={onPress}
                />
            )}
        </View>
    );

}