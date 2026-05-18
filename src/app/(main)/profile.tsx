import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);

  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
     await logout();

    // // ✅ elimina historial y manda a login
     router.replace("/(auth)/login");
  };

  return (
    <ScreenContainer noPadding>
      <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <View
          style={{
            height: 68,
            backgroundColor: "#FFFFFF",
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#F1F5F9",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ position: "absolute", left: 20 }}
          >
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: "900", color: "#111827" }}>
            Perfil
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 32,
            paddingBottom: 120,
          }}
        >
          <View style={{ alignItems: "center", marginBottom: 42 }}>
            <View style={{ position: "relative" }}>
              <Image
                source={{ uri: "https://i.pravatar.cc/200?img=12" }}
                style={{
                  width: 128,
                  height: 128,
                  borderRadius: 999,
                  borderWidth: 4,
                  borderColor: "#FED7C3",
                }}
              />

              <TouchableOpacity
                activeOpacity={0.85}
                style={{
                  position: "absolute",
                  right: 2,
                  bottom: 8,
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  backgroundColor: "#FA541C",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 3,
                  borderColor: "#FAFAFA",
                }}
              >
                <Ionicons name="pencil" size={15} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                marginTop: 18,
                fontSize: 25,
                fontWeight: "900",
                color: "#111827",
                textAlign: "center",
              }}
            >
              {user?.name}
            </Text>

            <Text
              style={{
                marginTop: 4,
                fontSize: 16,
                color: "#FA541C",
                fontWeight: "600",
              }}
            >
              {user?.email}
            </Text>
          </View>

          <SectionTitle title="Configuración" />

          <View style={{ gap: 4, marginBottom: 30 }}>
            <ProfileOption
              icon="notifications-outline"
              title="Notificaciones"
            />

            <ProfileOption
              icon="shield-outline"
              title="Seguridad"
            />

            <ProfileOption
              icon="globe-outline"
              title="Idioma"
              subtitle="Español"
            />
          </View>

          <SectionTitle title="Cuenta" />

          <View style={{ gap: 4 }}>


              <ProfileOption

                icon="log-out-outline"
                title="Cerrar sesión"
                danger
                hideChevron
                  onPress={handleLogout}

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
        fontSize: 21,
        fontWeight: "900",
        color: "#111827",
        marginBottom: 14,
      }}
    >
      {title}
    </Text>
  );
}

function ProfileOption({
  icon,
  title,
  subtitle,
  danger = false,
  hideChevron = false,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  danger?: boolean;
  hideChevron?: boolean;
    onPress?: () => void;

}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
            onPress={onPress}

      style={{
        minHeight: 72,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          backgroundColor: "#FFF1E8",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 16,
        }}
      >
        <Ionicons
          name={icon}
          size={22}
          color={danger ? "#EF4444" : "#FA541C"}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "800",
            color: danger ? "#EF4444" : "#111827",
          }}
        >
          {title}
        </Text>

        {subtitle && (
          <Text
            style={{
              marginTop: 2,
              fontSize: 12,
              color: "#64748B",
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {!hideChevron && (
        <Ionicons name="chevron-forward" size={22} color="#94A3B8" />
      )}
    </TouchableOpacity>
  );
}