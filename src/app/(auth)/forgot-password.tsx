import { AuthUseCase } from "@/modules/auth/application/auth.usecase";
import { AuthApi } from "@/modules/auth/infrastructure/auth.api";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { useToastStore } from "@/shared/storage/useToastStore";
import { inputTextStyle } from "@/shared/theme/theme.conf";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Platform,
  TextInput as RNTextInput,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { HelperText, Text } from "react-native-paper";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Correo inválido"),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordScreen() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSucces, setApiSucces] = useState<string | null>(null);
    const showToast = useToastStore((s) => s.show);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setApiError(null);
    setApiSucces(null);

    try {
      const useCase = new AuthUseCase(new AuthApi());

      const response = await useCase.sendEmailRestorePass(data.email);

      showToast(response.message,"success");
    } catch (error: any) {
      showToast(error.message, "error");
    }
  };

  return (
    <ScreenContainer noPadding>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FAFAFA",
          justifyContent: "center",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 70,
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "#EEF2F7",
              overflow: "hidden",

              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 18,
              shadowOffset: { width: 0, height: 12 },
              elevation: 6,
            }}
          >
            <View
              style={{
                paddingHorizontal: 24,
                paddingTop: 28,
                paddingBottom: 34,
              }}
            >
              {/* Header */}
              <View
                style={{
                  height: 34,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 42,
                }}
              >
                <TouchableOpacity
                  onPress={() => router.replace("/(auth)/login")}
                  style={{ position: "absolute", left: 0 }}
                >
                  <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#111827"
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "900",
                    color: "#111827",
                  }}
                >
                  Recuperar contraseña
                </Text>
              </View>

              {/* Icon */}
              <View
                style={{
                  width: 92,
                  height: 92,
                  borderRadius: 999,
                  backgroundColor: "#FFF1E8",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  marginBottom: 34,
                }}
              >
                <Ionicons
                  name="reload-circle-outline"
                  size={54}
                  color="#FA541C"
                />
              </View>

              {/* Title */}
              <Text
                style={{
                  fontSize: 28,
                  lineHeight: 36,
                  fontWeight: "900",
                  color: "#111827",
                  textAlign: "center",
                  marginBottom: 14,
                  letterSpacing: -0.6,
                }}
              >
                ¿Olvidaste tu contraseña?
              </Text>

              <Text
                style={{
                  fontSize: 17,
                  lineHeight: 29,
                  color: "#64748B",
                  textAlign: "center",
                  marginBottom: 34,
                }}
              >
                No te preocupes. Ingresa tu correo electrónico asociado a{" "}
                <Text style={{ color: "#FA541C" }}>HomeTask</Text> para recibir
                un enlace de recuperación.
              </Text>

              {/* Input */}
              <Text
                style={{
                  fontSize: 15,
                  color: "#334155",
                  fontWeight: "800",
                  marginBottom: 8,
                }}
              >
                Correo electrónico
              </Text>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <View
                    style={{
                      height: 52,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#E2E8F0",
                      backgroundColor: "#FFFFFF",
                      paddingHorizontal: 14,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color="#94A3B8"
                    />

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

              {errors.email && (
                <Text
                  style={{
                    color: "#EF4444",
                    fontSize: 12,
                    marginTop: 6,
                  }}
                >
                  {errors.email.message}
                </Text>
              )}

              {/* Button */}
              <TouchableOpacity
                activeOpacity={0.85}
                disabled={isSubmitting}
                onPress={handleSubmit(onSubmit)}
                style={{
                  height: 54,
                  borderRadius: 8,
                  backgroundColor: "#FA541C",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 26,

                  shadowColor: "#FA541C",
                  shadowOpacity: 0.28,
                  shadowRadius: 14,
                  shadowOffset: { width: 0, height: 8 },
                  elevation: 8,

                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 18,
                    fontWeight: "900",
                  }}
                >
                  {isSubmitting
                    ? "Enviando..."
                    : "Enviar enlace"}
                </Text>
              </TouchableOpacity>

              {/* Messages */}
              {apiError && (
                <HelperText
                  type="error"
                  visible
                  style={{
                    textAlign: "center",
                    marginTop: 12,
                  }}
                >
                  {apiError}
                </HelperText>
              )}

              {apiSucces && (
                <HelperText
                  type="info"
                  visible
                  style={{
                    textAlign: "center",
                    marginTop: 12,
                  }}
                >
                  {apiSucces}
                </HelperText>
              )}
            </View>

            {/* Footer */}
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#F1F5F9",
                paddingVertical: 26,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#64748B", fontSize: 14 }}>
                ¿Recordaste tu contraseña?{" "}
              </Text>

              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#FA541C",
                      fontSize: 14,
                    }}
                  >
                    Inicia sesión
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* Bottom line */}
            <View
              style={{
                height: 6,
                backgroundColor: "#FA541C",
              }}
            />
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}