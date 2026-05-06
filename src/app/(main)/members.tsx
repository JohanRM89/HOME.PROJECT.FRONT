import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Modal,
  Portal,
  Text,
} from "react-native-paper";

export default function MembersScreen() {
  const [visible, setVisible] = useState(false);
  const inviteCode = "HG-92KD";

  const copyCode = async () => {
    await Clipboard.setStringAsync(inviteCode);
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* ═══════════════════════════════ */}
        {/* TÍTULO */}
        {/* ═══════════════════════════════ */}
        <Text variant="headlineMedium" style={{ marginBottom: 16 }}>
          Miembros del hogar
        </Text>

        {/* ═══════════════════════════════ */}
        {/* CARD DEL HOGAR */}
        {/* ═══════════════════════════════ */}
        <Card style={{ marginBottom: 24 }}>
          <Card.Content>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Ionicons name="home-outline" size={32} color="#6750A4" />
              <View style={{ flex: 1 }}>
                <Text variant="titleMedium">Hogar Gómez</Text>
                <Text variant="bodyMedium">
                  Hogar principal · 4 miembros
                </Text>

                <Button
                  mode="outlined"
                  icon="share-variant"
                  style={{ marginTop: 12, alignSelf: "flex-start" }}
                  onPress={() => setVisible(true)}
                >
                  Compartir código de invitación
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>

        {/* ═══════════════════════════════ */}
        {/* LISTA DE MIEMBROS */}
        {/* ═══════════════════════════════ */}
        <MemberRow
          name="Juan Gómez"
          role="Padre"
          points={120}
        />
        <MemberRow
          name="María Gómez"
          role="Madre"
          points={110}
        />
        <MemberRow
          name="Carlos Gómez"
          role="Hijo"
          points={60}
        />
        <MemberRow
          name="Ana Gómez"
          role="Hija"
          points={45}
        />
      </ScrollView>

      {/* ═══════════════════════════════ */}
      {/* MODAL CÓDIGO DE INVITACIÓN */}
      {/* ═══════════════════════════════ */}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{
            backgroundColor: "white",
            padding: 24,
            margin: 16,
            borderRadius: 12,
          }}
        >
          <Text
            variant="titleLarge"
            style={{ textAlign: "center", marginBottom: 16 }}
          >
            Código de invitación
          </Text>

          <Pressable onPress={copyCode}>
            <Text
              variant="headlineMedium"
              style={{
                textAlign: "center",
                color: "#6750A4",
                marginBottom: 16,
              }}
            >
              {inviteCode}
            </Text>
          </Pressable>

          <Text
            style={{ textAlign: "center", marginBottom: 24 }}
          >
            Toca el código para copiarlo
          </Text>

          <Button mode="contained" onPress={() => setVisible(false)}>
            Cerrar
          </Button>
        </Modal>
      </Portal>
    </>
  );
}

/* ═══════════════════════════════ */
/* COMPONENTE MIEMBRO */
/* ═══════════════════════════════ */

function MemberRow({
  name,
  role,
  points,
}: {
  name: string;
  role: string;
  points: number;
}) {
  return (
    <Card style={{ marginBottom: 12 }}>
      <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Icon
          size={40}
          icon="account"
          style={{ marginRight: 12 }}
        />

        <View style={{ flex: 1 }}>
          <Text variant="titleMedium">{name}</Text>
          <Text variant="bodySmall">{role}</Text>
        </View>

        <Text variant="titleMedium">{points} pts</Text>
      </Card.Content>
    </Card>
  );
}
