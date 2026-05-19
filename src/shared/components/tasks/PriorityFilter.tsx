// shared/components/common/FilterSelect.tsx

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export type SelectOption = {
  label: string;
  value: string;
};

interface PriorityFilterProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  icon?: keyof typeof Ionicons.glyphMap;
}

export function PriorityFilter({
  label,
  value,
  options,
  onChange,
  icon = "filter-outline",
}: PriorityFilterProps) {
  const [visible, setVisible] = useState(false);

  const selectedOption = options.find((item) => item.value === value);

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        style={{
          height: 38,
          paddingHorizontal: 12,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#FFD6C8",
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Ionicons name={icon} size={16} color="#FA541C" />

        <Text
          style={{
            fontSize: 13,
            color: "#1E293B",
            fontWeight: "700",
          }}
        >
          {selectedOption?.label ?? label}
        </Text>

        <Ionicons name="chevron-down" size={16} color="#1E293B" />
      </Pressable>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          onPress={() => setVisible(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.25)",
            justifyContent: "flex-end",
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#FFFFFF",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 22,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "900",
                color: "#111827",
                marginBottom: 18,
              }}
            >
              {label}
            </Text>

            <View style={{ gap: 10 }}>
              {options.map((option) => {
                const active = option.value === value;

                return (
                  <TouchableOpacity
                    key={option.value}
                    activeOpacity={0.85}
                    onPress={() => {
                      onChange(option.value);
                      setVisible(false);
                    }}
                    style={{
                      minHeight: 52,
                      borderRadius: 14,
                      paddingHorizontal: 14,
                      backgroundColor: active ? "#FFF1E8" : "#F8FAFC",
                      borderWidth: 1,
                      borderColor: active ? "#FA541C" : "#EEF2F7",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: active ? "#FA541C" : "#334155",
                        fontSize: 15,
                        fontWeight: "800",
                      }}
                    >
                      {option.label}
                    </Text>

                    {active && (
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color="#FA541C"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}