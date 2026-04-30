import { AuthUseCase } from "@/modules/auth/application/auth.usecase";
import { AuthApi } from "@/modules/auth/infrastructure/auth.api";
import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { z } from "zod";



const schema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export default function LoginScreen() {
  const loginStore = useAuthStore((s) => s.login);
  const [apiError, setApiError] = useState<string | null>(null);

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
      setApiError(error.message);
    }

  };

  return (
    <>
      <View style={{ padding: 24, gap: 16 }}>
        <Text variant="headlineMedium">Iniciar sesión</Text>

        {/* EMAIL */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Correo"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
              keyboardType="email-address"
              error={!!errors.email}
            />
          )}
        />

        {errors.email && (
          <Text style={{ color: "red" }}>{errors.email.message}</Text>
        )}

        {/* PASSWORD */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="Contraseña"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              error={!!errors.password}
            />
          )}
        />

        {errors.password && (
          <Text style={{ color: "red" }}>{errors.password.message}</Text>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
        >
          Entrar
        </Button>
        {/* Link de recuperar contraseña */}

        <Link href="/(auth)/forgot-password">
          <Text
            style={{
              textAlign: "center",
              marginTop: 12,
              color: "#6750A4", // Material 3 primary
            }}
          >
            ¿Olvidaste tu contraseña?
          </Text>
        </Link>
        {/* Link de recuperar contraseña */}

        <Link href="/(auth)/register">
          <Text
            style={{
              textAlign: "center",
              marginTop: 12,
              color: "#6750A4", // Material 3 primary
            }}
          >
            Deseas registrarse 
          </Text>
        </Link>


        {/* Mensaje de error */}
        {apiError && (
          <HelperText type="error" visible={!!apiError}>
            {apiError}
          </HelperText>)}
      </View>


    </>
  );
}
``;
