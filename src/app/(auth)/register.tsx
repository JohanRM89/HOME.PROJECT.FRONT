import { AuthUseCase } from "@/modules/auth/application/auth.usecase";
import { AuthApi } from "@/modules/auth/infrastructure/auth.api";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    TextInput as RNTextInput,
    ScrollView,
    TouchableOpacity,
    View,
} from "react-native";
import { HelperText, Text } from "react-native-paper";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(1, "Nombre obligatorio"),
    email: z.string().email("Correo no válido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirmPassword: z.string().min(8, "Confirma la contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function RegisterScreen() {
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSucces, setApiSucces] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setApiError(null);
    setApiSucces(null);

    try {
      const useCase = new AuthUseCase(new AuthApi());

      await useCase.createUser?.({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      setApiSucces("Cuenta creada correctamente");
      reset();

      router.push("/(auth)/login");
    } catch (error: any) {
      setApiError(error.message);
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
            paddingVertical: 72,
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 10,
              paddingTop: 28,
              paddingHorizontal: 24,
              paddingBottom: 0,
              borderWidth: 1,
              borderColor: "#EEF2F7",
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 18,
              shadowOffset: { width: 0, height: 12 },
              elevation: 6,
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <View
              style={{
                height: 34,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 28,
              }}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ position: "absolute", left: 0 }}
              >
                <Ionicons name="arrow-back" size={24} color="#111827" />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "900",
                  color: "#111827",
                }}
              >
                Crear cuenta
              </Text>
            </View>

            <Text
              style={{
                fontSize: 30,
                fontWeight: "900",
                color: "#111827",
                textAlign: "center",
                letterSpacing: -0.6,
              }}
            >
              Únete a HomeTask
            </Text>

            <Text
              style={{
                marginTop: 8,
                marginBottom: 18,
                fontSize: 17,
                lineHeight: 26,
                color: "#64748B",
                textAlign: "center",
              }}
            >
              Completa tus datos para comenzar a organizar tu hogar
            </Text>

            <FormInput
              control={control}
              name="name"
              label="Nombre completo"
              placeholder="Ej. Juan Pérez"
              icon="person-outline"
              error={errors.name?.message}
            />

            <FormInput
              control={control}
              name="email"
              label="Correo electrónico"
              placeholder="correo@ejemplo.com"
              icon="mail-outline"
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <FormInput
              control={control}
              name="password"
              label="Contraseña"
              placeholder="Mínimo 8 caracteres"
              icon="lock-closed-outline"
              error={errors.password?.message}
              secureTextEntry={!showPassword}
              rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
              onRightPress={() => setShowPassword(!showPassword)}
            />

            <FormInput
              control={control}
              name="confirmPassword"
              label="Confirmar contraseña"
              placeholder="Repite tu contraseña"
              icon="reload-outline"
              error={errors.confirmPassword?.message}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              activeOpacity={0.85}
              disabled={isSubmitting}
              onPress={handleSubmit(onSubmit)}
              style={{
                height: 56,
                borderRadius: 999,
                backgroundColor: "#FA541C",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 28,
                marginBottom: 34,
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
                  fontSize: 16,
                  fontWeight: "900",
                }}
              >
                {isSubmitting ? "Registrando..." : "Registrarse"}
              </Text>
            </TouchableOpacity>

            {apiError && (
              <HelperText type="error" visible style={{ textAlign: "center" }}>
                {apiError}
              </HelperText>
            )}

            {apiSucces && (
              <HelperText type="info" visible style={{ textAlign: "center" }}>
                {apiSucces}
              </HelperText>
            )}

            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#F1F5F9",
                paddingVertical: 28,
                marginHorizontal: -24,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#64748B", fontSize: 14 }}>
                ¿Ya tienes cuenta?{" "}
              </Text>

              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text style={{ color: "#FA541C", fontSize: 14 }}>
                    Inicia sesión
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenContainer>
  );
}

function FormInput({
  control,
  name,
  label,
  placeholder,
  icon,
  error,
  rightIcon,
  onRightPress,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize,
}: any) {
  return (
    <View style={{ marginTop: 18 }}>
      <Text
        style={{
          fontSize: 15,
          color: "#334155",
          fontWeight: "800",
          marginBottom: 8,
        }}
      >
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View
            style={{
              height: 48,
              borderRadius: 12,
              backgroundColor: "#F8FAFC",
              paddingHorizontal: 12,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name={icon} size={20} color="#94A3B8" />

            <RNTextInput
              value={value}
              onChangeText={onChange}
              placeholder={placeholder}
              placeholderTextColor="#94A3B8"
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              style={{
                flex: 1,
                marginLeft: 12,
                fontSize: 16,
                color: "#111827",
                paddingVertical: 0,
              }}
            />

            {rightIcon && (
              <TouchableOpacity onPress={onRightPress}>
                <Ionicons name={rightIcon} size={20} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {error && (
        <Text
          style={{
            color: "#EF4444",
            fontSize: 12,
            marginTop: 6,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}