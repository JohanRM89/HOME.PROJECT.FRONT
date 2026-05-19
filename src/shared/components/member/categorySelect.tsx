import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

type CategoryOption = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export function CategorySelect({
  value,
  categories,
  onChange,
}: {
  value?: string;
  categories: CategoryOption[];
  onChange: (categoryId: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  const selected = categories.find((c) => c.id === value);

  return (
    <>
      <Pressable onPress={() => setVisible(true)} style={selectBox}>
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 999,
            backgroundColor: selected ? `${selected.color}22` : "#FFF1E8",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name={(selected?.icon ?? "pricetag-outline") as keyof typeof Ionicons.glyphMap}
            size={22}
            color={selected?.color ?? "#FA541C"}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ color: "#94A3B8", fontSize: 12, fontWeight: "800" }}>
            Categoría
          </Text>

          <Text
            style={{
              color: selected ? "#111827" : "#94A3B8",
              fontSize: 16,
              fontWeight: "800",
            }}
          >
            {selected?.name ?? "Selecciona una categoría"}
          </Text>
        </View>

        <Ionicons name="chevron-down" size={20} color="#94A3B8" />
      </Pressable>

      <Modal transparent visible={visible} animationType="fade">
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
              maxHeight: "70%",
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
              Selecciona categoría
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ gap: 10 }}>
                {categories.map((category) => {
                  const active = category.id === value;

                  return (
                    <TouchableOpacity
                      key={category.id}
                      activeOpacity={0.85}
                      onPress={() => {
                        onChange(category.id);
                        setVisible(false);
                      }}
                      style={{
                        minHeight: 58,
                        borderRadius: 16,
                        paddingHorizontal: 14,
                        backgroundColor: active ? "#FFF1E8" : "#F8FAFC",
                        borderWidth: 1,
                        borderColor: active ? "#FA541C" : "#EEF2F7",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 999,
                          backgroundColor: `${category.color}22`,
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: 12,
                        }}
                      >
                        <Ionicons
                          name={category.icon as keyof typeof Ionicons.glyphMap}
                          size={22}
                          color={category.color}
                        />
                      </View>

                      <Text
                        style={{
                          flex: 1,
                          color: active ? "#FA541C" : "#111827",
                          fontSize: 15,
                          fontWeight: "900",
                        }}
                      >
                        {category.name}
                      </Text>

                      {active && (
                        <Ionicons name="checkmark-circle" size={22} color="#FA541C" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const selectBox = {
  minHeight: 64,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "#E2E8F0",
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 14,
  flexDirection: "row" as const,
  alignItems: "center" as const,
  gap: 12,
};