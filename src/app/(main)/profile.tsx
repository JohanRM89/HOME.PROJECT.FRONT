import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/* ───────────────────────── */
/* DATA DE MENÚ */
/* ───────────────────────── */
const settingsOptions = [
  {
    id: "notifications",
    title: "Notificaciones",
    icon: "notifications-outline",
  },
  {
    id: "security",
    title: "Seguridad",
    icon: "shield-checkmark-outline",
  },
  {
    id: "language",
    title: "Idioma",
    icon: "globe-outline",
    subtitle: "Español",
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* ───────────────────────── */}
      {/* HEADER */}
      {/* ───────────────────────── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Perfil</Text>

        {/* Espacio para centrar el título */}
        <View style={{ width: 24 }} />
      </View>

      {/* ───────────────────────── */}
      {/* PERFIL USUARIO */}
      {/* ───────────────────────── */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: "https://ui-avatars.com/api/?name=Alejandro+Garcia",
            }}
            style={styles.avatar}
          />

          {/* BOTÓN EDITAR */}
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="pencil" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>Alejandro García</Text>
        <Text style={styles.email}>
          alejandro.garcia@hometask.com
        </Text>
      </View>

      {/* ───────────────────────── */}
      {/* CONFIGURACIÓN */}
      {/* ───────────────────────── */}
      <Text style={styles.sectionTitle}>Configuración</Text>

      <FlatList
        data={settingsOptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItem
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
          />
        )}
      />

      {/* ───────────────────────── */}
      {/* CUENTA */}
      {/* ───────────────────────── */}
      <Text style={styles.sectionTitle}>Cuenta</Text>

      <MenuItem
        icon="log-out-outline"
        title="Cerrar sesión"
        danger
        onPress={() => console.log("Logout")}
      />
    </View>
  );
}

/* ───────────────────────── */
/* COMPONENTE MENU ITEM */
/* ───────────────────────── */
function MenuItem({
  icon,
  title,
  subtitle,
  onPress,
  danger = false,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuLeft}>
        <Ionicons
          name={icon as any}
          size={22}
          color={danger ? "#FF6B35" : "#555"}
        />

        <View style={{ marginLeft: 12 }}>
          <Text
            style={[
              styles.menuTitle,
              danger && { color: "#FF6B35" },
            ]}
          >
            {title}
          </Text>

          {subtitle && (
            <Text style={styles.menuSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#999"
      />
    </TouchableOpacity>
  );
}

/* ───────────────────────── */
/* ESTILOS */
/* ───────────────────────── */
const PRIMARY = "#FF6B35";
const BG = "#F4F5F7";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    padding: 16,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },

  /* Perfil */
  profileSection: {
    alignItems: "center",
    marginBottom: 32,
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 12,
  },

  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: "#ddd",
  },

  editAvatarButton: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: PRIMARY,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
  },

  email: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },

  /* Secciones */
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
  },

  /* Menu */
  menuItem: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    elevation: 1,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuTitle: {
    fontSize: 15,
    color: "#111",
  },

  menuSubtitle: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
});