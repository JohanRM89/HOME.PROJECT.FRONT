import { AuthUseCase } from "@/modules/auth/application/auth.usecase";
import { AuthApi } from "@/modules/auth/infrastructure/auth.api";
import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { useToastStore } from "@/shared/storage/useToastStore";
import { inputTextStyle, inputWrapperStyle } from "@/shared/theme/theme.conf";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ImageBackground,
  Platform,
  TextInput as RNTextInput,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import { HelperText, Text } from "react-native-paper";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});
type FormData = z.infer<typeof schema>;

export default function LoginScreen() {
  const loginStore = useAuthStore((s) => s.login);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const showToast = useToastStore((s) => s.show);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setApiError(null);

    try {
      const useCase = new AuthUseCase(new AuthApi());
      const user = await useCase.execute(data.email, data.password);
      loginStore(user);
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  return (
    <ScreenContainer noPadding>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 18,
          paddingBottom: 28,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 34 }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              backgroundColor: "#FFF1E8",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 18,
              shadowColor: "#FA541C",
              shadowOpacity: 0.25,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 8 },
              elevation: 8,
            }}
          >
            <Image
              source={require("@/assets/images/favicon.png")}
              style={{
                width: 90,
                height: 90,
                resizeMode: "contain",
              }}
            />
          </View>

          <Text style={{ fontSize: 32, fontWeight: "900", color: "#111827" }}>
            HomeTask
          </Text>

          <Text style={{ marginTop: 8, fontSize: 16, color: "#64748B" }}>
            Gestiona tus tareas del hogar con facilidad
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "#DDE3EA",
            padding: 32,
            shadowColor: "#000",
            shadowOpacity: 0.04,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
          }}
        >
          <ImageBackground
            source={require("@/assets/images/banner.png")}
            imageStyle={{
              borderRadius: 14,
            }}
            style={{
              height: 150,
              justifyContent: "flex-end",
              marginBottom: 28,
              overflow: "hidden",
              width: "100%",
            }}
          >
            <View
              style={{
                padding: 16,
                backgroundColor: "rgba(255,255,255,0.45)",
              }}
            >
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: "900",
                  color: "#111827",
                }}
              >
                Bienvenido de nuevo
              </Text>
            </View>
          </ImageBackground>

          <Text style={labelStyle}>Correo electrónico</Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <View style={inputWrapperStyle}>
                <Ionicons name="mail-outline" size={20} color="#94A3B8" />
                <RNTextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="ejemplo@correo.com"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  underlineColorAndroid="transparent"
                  style={[
                    inputTextStyle,
                    Platform.OS === "web" &&
                    ({
                      outlineWidth: 0,
                      outlineColor: "transparent",
                    } as any),
                  ]}
                />
              </View>
            )}
          />

          {errors.email && <ErrorText text={errors.email.message} />}

          <Text style={[labelStyle, { marginTop: 24 }]}>Contraseña</Text>

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View style={inputWrapperStyle}>
                <Ionicons name="lock-closed-outline" size={20} color="#94A3B8" />
                <RNTextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  style={[
                    inputTextStyle,
                    Platform.OS === "web" &&
                    ({
                      outlineWidth: 0,
                      outlineColor: "transparent",
                    } as any),
                  ]}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>
            )}
          />

          {errors.password && <ErrorText text={errors.password.message} />}

          <Link href="/(auth)/forgot-password" asChild>
            <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 22 }}>
              <Text style={{ color: "#FA541C", fontWeight: "700" }}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            activeOpacity={0.85}
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            style={{
              height: 52,
              borderRadius: 7,
              backgroundColor: "#FA541C",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 8,
              marginTop: 28,
              shadowColor: "#FA541C",
              shadowOpacity: 0.35,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 8 },
              elevation: 8,
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "900" }}>
              {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
            </Text>

            <Ionicons name="log-in-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          {apiError && (
            <HelperText type="error" visible style={{ textAlign: "center" }}>
              {apiError}
            </HelperText>
          )}
        </View>

        <View
          style={{
            marginTop: 34,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#64748B", fontSize: 14 }}>
            ¿No tienes una cuenta?{" "}
          </Text>

          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text style={{ color: "#FA541C", fontSize: 14 }}>
                Regístrate gratis
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function ErrorText({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <Text style={{ color: "#EF4444", fontSize: 12, marginTop: 6 }}>
      {text}
    </Text>
  );
}

const labelStyle = {
  fontSize: 15,
  color: "#334155",
  fontWeight: "800" as const,
  marginBottom: 8,
};

const inputWrapper = {
  height: 50,
  borderRadius: 7,
  borderWidth: 1,
  borderColor: "#DDE3EA",
  paddingHorizontal: 12,
  flexDirection: "row" as const,
  alignItems: "center" as const,
  backgroundColor: "#FFFFFF",
};

