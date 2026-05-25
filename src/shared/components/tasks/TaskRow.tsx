import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

type TaskStatus = "Pendiente" | "En proceso" | "Completada";

export function TaskRow({
  taskId,
  title,
  date,
  status,
  categoryName,
  categoryIcon,
  categoryColor,
  disabled = false,
  highlighted = false,
  onPress,
  onDeleteSuccess,
}: {
  taskId: string;
  title: string;
  date: string;
  status: TaskStatus;
  categoryName?: string;
  categoryIcon?: keyof typeof Ionicons.glyphMap;
  categoryColor?: string;
  disabled?: boolean;
  highlighted?: boolean;
  onPress?: () => void;
  onDeleteSuccess?: () => void;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isCompleted = status === "Completada";
  const isProgress = status === "En proceso";

  const color = categoryColor ?? "#FA541C";
  const icon = categoryIcon ?? "clipboard-outline";

  // const handleDelete = async () => {
  //   try {
  //     setDeleting(true);

  //     await httpClient.delete(`/tasks/${taskId}`);

  //     setShowDeleteModal(false);
  //     onDeleteSuccess?.();
  //   } catch (error) {
  //     console.log("Error eliminando tarea:", error);
  //   } finally {
  //     setDeleting(false);
  //   }
  // };

  return (
    <>
      <Pressable
        onPress={onPress}
        style={{
          minHeight: 82,
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          paddingVertical: 16,
          paddingHorizontal: 16,
          borderWidth: 1.5,
          borderColor: `${color}55`,
          borderLeftWidth: highlighted ? 5 : 1.5,
          borderLeftColor: color,
          flexDirection: "row",
          alignItems: "center",

          shadowColor: "#000",
          shadowOpacity: 0.03,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 1,
        }}
      >
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 14,
            backgroundColor: `${color}22`,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 14,
          }}
        >
          <Ionicons name={icon} size={23} color={color} />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 16,
              fontWeight: "900",
              color: disabled ? "#94A3B8" : "#111827",
              textDecorationLine: disabled ? "line-through" : "none",
            }}
          >
            {title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 7,
            }}
          >
            <Text
              style={{
                fontSize: 11,
                fontWeight: "900",
                color: isProgress ? "#FA541C" : isCompleted ? "#94A3B8" : "#EF4444",
              }}
            >
              {date}
            </Text>

            {categoryName && (
              <View
                style={{
                  backgroundColor: `${color}18`,
                  paddingHorizontal: 8,
                  paddingVertical: 3,
                  borderRadius: 999,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Ionicons name={icon} size={11} color={color} />

                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "900",
                    color,
                  }}
                >
                  {categoryName.toUpperCase()}
                </Text>
              </View>
            )}
          </View>
        </View>

        {isCompleted ? (
          <></>
          // <TouchableOpacity
          //   activeOpacity={0.85}
          //   onPress={() => setShowDeleteModal(true)}
          //   style={{
          //     width: 38,
          //     height: 38,
          //     borderRadius: 999,
          //     backgroundColor: "#FFF1E8",
          //     justifyContent: "center",
          //     alignItems: "center",
          //   }}
          // >
          //   <Ionicons name="trash-outline" size={21} color="#FA541C" />
          // </TouchableOpacity>
        ) : (
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 999,
              borderWidth: 2,
              borderColor: isProgress ? "#FA541C" : "#CBD5E1",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isProgress && (
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 999,
                  backgroundColor: "#FA541C",
                }}
              />
            )}
          </View>
        )}
      </Pressable>

      <Modal transparent visible={showDeleteModal} animationType="fade">
        <Pressable
          onPress={() => setShowDeleteModal(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.25)",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <Pressable
            style={{
              width: "100%",
              backgroundColor: "#FFFFFF",
              borderRadius: 22,
              padding: 24,
            }}
          >
            <View
              style={{
                width: 62,
                height: 62,
                borderRadius: 999,
                backgroundColor: "#FFF1E8",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                marginBottom: 18,
              }}
            >
              <Ionicons name="trash-outline" size={30} color="#FA541C" />
            </View>

            <Text
              style={{
                fontSize: 21,
                fontWeight: "900",
                color: "#111827",
                textAlign: "center",
              }}
            >
              ¿Eliminar tarea?
            </Text>

            <Text
              style={{
                marginTop: 10,
                fontSize: 15,
                lineHeight: 22,
                color: "#64748B",
                textAlign: "center",
              }}
            >
              Esta tarea ya está completada. Si la eliminas, no aparecerá más en la lista.
            </Text>

            <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setShowDeleteModal(false)}
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 999,
                  backgroundColor: "#F8FAFC",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#64748B", fontWeight: "900" }}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                activeOpacity={0.85}
                disabled={deleting}
                onPress={handleDelete}
                style={{
                  flex: 1,
                  height: 48,
                  borderRadius: 999,
                  backgroundColor: "#FA541C",
                  justifyContent: "center",
                  alignItems: "center",
                  opacity: deleting ? 0.7 : 1,
                }}
              >
                <Text style={{ color: "#FFFFFF", fontWeight: "900" }}>
                  {deleting ? "Eliminando..." : "Eliminar"}
                </Text>
              </TouchableOpacity> */}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}