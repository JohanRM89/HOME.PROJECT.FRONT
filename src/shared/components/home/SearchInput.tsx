// shared/components/common/SearchInput.tsx

import { Ionicons } from "@expo/vector-icons";
import {
    Platform,
    TextInput as RNTextInput,
    View,
} from "react-native";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChangeText,
  placeholder = "Buscar...",
}: SearchInputProps) {
  return (
    <View
      style={{
        height: 54,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#EEF2F7",
        backgroundColor: "#FFFFFF",

        paddingHorizontal: 16,

        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Ionicons
        name="search-outline"
        size={20}
        color="#94A3B8"
      />

      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        autoCorrect={false}
        cursorColor="#FA541C"
        selectionColor="#FA541C"
        underlineColorAndroid="transparent"
        style={[
          {
            flex: 1,
            marginLeft: 12,
            fontSize: 15,
            color: "#111827",
            paddingVertical: 0,
          },

          Platform.OS === "web" &&
            ({
              outlineWidth: 0,
              outlineColor: "transparent",
            } as any),
        ]}
      />
    </View>
  );
}