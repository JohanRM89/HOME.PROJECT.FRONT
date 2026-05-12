import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
export default function TaskDetailScreen() {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState("");
  return (
    <ScreenContainer noPadding>
      <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <View
          style={{
            height: 64,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
            borderBottomWidth: 1,
            borderBottomColor: "#F1F5F9",
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>

          <Text style={{ fontSize: 18, fontWeight: "800", color: "#111827" }}>
            Detalle de Tarea
          </Text>

          <Ionicons name="ellipsis-vertical" size={22} color="#111827" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 26,
            paddingTop: 24,
            paddingBottom: 130,
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#FFECE5",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 999,
              marginBottom: 14,
            }}
          >
            <Text style={{ color: "#FA541C", fontWeight: "900", fontSize: 12 }}>
              PRIORIDAD ALTA
            </Text>
          </View>

          <Text
            style={{
              fontSize: 30,
              lineHeight: 37,
              fontWeight: "900",
              color: "#111827",
              letterSpacing: -0.8,
              marginBottom: 28,
            }}
          >
            Limpieza profunda de la cocina
          </Text>

          <SectionTitle title="ESTADO ACTUAL" />

          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#F8FAFC",
              borderRadius: 14,
              padding: 4,
              marginBottom: 34,
            }}
          >
            <StatusOption active icon="time-outline" label="PENDIENTE" />
            <StatusOption icon="sync-outline" label="EN PROCESO" />
            <StatusOption icon="checkmark-circle-outline" label="COMPLETADA" />
          </View>

          <View style={{ flexDirection: "row", gap: 16, marginBottom: 34 }}>
            <InfoCard
              iconType="avatar"
              label="RESPONSABLE"
              value="Carlos Ruiz"
            />

            <InfoCard
              icon="calendar-outline"
              label="VENCIMIENTO"
              value="Hoy, 18:00"
            />
          </View>

          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
              color: "#111827",
              marginBottom: 14,
            }}
          >
            Descripción
          </Text>

          <Text
            style={{
              fontSize: 16,
              lineHeight: 27,
              color: "#475569",
              marginBottom: 34,
            }}
          >
            Limpieza exhaustiva de todas las superficies, incluyendo el interior
            del horno, campana extractora y organización de la despensa. Es
            necesario revisar las fechas de caducidad de los productos
            almacenados.
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "900", color: "#111827" }}>
              Notas y Comentarios
            </Text>

            <TouchableOpacity onPress={() => setShowNoteInput(true)}>
              <Text style={{ color: "#FA541C", fontWeight: "800", fontSize: 14 }}>
                + Añadir
              </Text>
            </TouchableOpacity>
          </View>
          {showNoteInput && (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 14,
                borderWidth: 1,
                borderColor: "#FED7C3",
                padding: 14,
                marginBottom: 16,
              }}
            >
              <TextInput
                value={note}
                onChangeText={setNote}
                placeholder="Escribe una nota o comentario..."
                placeholderTextColor="#94A3B8"
                multiline
                textAlignVertical="top"
                style={{
                  minHeight: 90,
                  fontSize: 15,
                  color: "#111827",
                  padding: 0,
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  marginTop: 14,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    setNote("");
                    setShowNoteInput(false);
                  }}
                  style={{
                    flex: 1,
                    height: 44,
                    borderRadius: 999,
                    backgroundColor: "#FDE9E2",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#FA541C",
                      fontWeight: "800",
                    }}
                  >
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => {
                    console.log("Nota guardada:", note);

                    setNote("");
                    setShowNoteInput(false);
                  }}
                  style={{
                    flex: 1,
                    height: 44,
                    borderRadius: 999,
                    backgroundColor: "#FA541C",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "800",
                    }}
                  >
                    Guardar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={{ gap: 14 }}>
            <CommentCard
              highlighted
              text="No olvidar comprar desengrasante antes de empezar."
              meta="Hace 2 horas • Carlos R."
            />

            <CommentCard
              text="¿Alguien sabe dónde están los paños de microfibra nuevos?"
              meta="Hace 15 min • Maria G."
            />
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <Text
      style={{
        fontSize: 13,
        fontWeight: "900",
        color: "#64748B",
        letterSpacing: 0.7,
        marginBottom: 14,
      }}
    >
      {title}
    </Text>
  );
}

function StatusOption({
  active = false,
  icon,
  label,
}: {
  active?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <Pressable
      style={{
        flex: 1,
        height: 64,
        borderRadius: 10,
        backgroundColor: active ? "#FFFFFF" : "transparent",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: active ? 1 : 0,
        borderColor: "#E2E8F0",
        shadowColor: "#000",
        shadowOpacity: active ? 0.05 : 0,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: active ? 2 : 0,
      }}
    >
      <Ionicons
        name={icon}
        size={22}
        color={active ? "#FA541C" : "#94A3B8"}
      />

      <Text
        style={{
          marginTop: 5,
          color: active ? "#111827" : "#64748B",
          fontSize: 10,
          fontWeight: "900",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function InfoCard({
  label,
  value,
  icon,
  iconType,
}: {
  label: string;
  value: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconType?: "avatar";
}) {
  return (
    <View
      style={{
        flex: 1,
        minHeight: 64,
        backgroundColor: "#F8FAFC",
        borderRadius: 12,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {iconType === "avatar" ? (
        <Image
          source={{ uri: "https://i.pravatar.cc/100?img=12" }}
          style={{ width: 42, height: 42, borderRadius: 999, marginRight: 10 }}
        />
      ) : (
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
            backgroundColor: "#FFECE5",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Ionicons name={icon ?? "calendar-outline"} size={24} color="#FA541C" />
        </View>
      )}

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 10, fontWeight: "900", color: "#CBD5E1" }}>
          {label}
        </Text>

        <Text style={{ fontSize: 14, fontWeight: "800", color: "#111827" }}>
          {value}
        </Text>
      </View>
    </View>
  );
}

function CommentCard({
  text,
  meta,
  highlighted = false,
}: {
  text: string;
  meta: string;
  highlighted?: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: "#F8FAFC",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderLeftWidth: highlighted ? 4 : 0,
        borderLeftColor: "#FA541C",
      }}
    >
      <Text style={{ fontSize: 15, lineHeight: 22, color: "#475569" }}>
        {text}
      </Text>

      <Text
        style={{
          marginTop: 8,
          fontSize: 11,
          color: "#94A3B8",
          fontWeight: "700",
        }}
      >
        {meta}
      </Text>
    </View>
  );
}