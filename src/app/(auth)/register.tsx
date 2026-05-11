import { AuthUseCase } from "@/modules/auth/application/auth.usecase";
import { AuthApi } from "@/modules/auth/infrastructure/auth.api";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import z from "zod";


const schema = z
    .object({
        name: z.string().min(1, "Nombre obligatorio"),
        email: z.string().email("Correo no válido"),
        password: z.string().min(6, "Mínimo 6 caracteres"),
        confirmPassword: z.string().min(6, "Confirma la contraseña"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

type FormData = z.infer<typeof schema>;

export default function RegisterScreen() {

    const [apiError, setApiError] = useState<string | null>(null);
    const [apiSucces, setApiSucces] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
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
        const { confirmPassword, ...sendData } = data;
        try {
            const useCase = new AuthUseCase(new AuthApi());
            const data = await useCase.createUser(sendData)
            data && setApiSucces("Usuario registrado correctamente, porfavor inicie sesión");
            reset();
        } catch (error: any) {
            setApiError(error.message);

        }
    }

    const router = useRouter();


    return (
        <>
            <ScreenContainer>

                {/* BOTÓN VOLVER */}
                <Pressable
                    onPress={() => router.replace("/(auth)/login")}
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <Ionicons name="chevron-back" size={24} color="#6750A4" />
                    <Text style={{ color: "#6750A4", marginLeft: 4 }}>Volver</Text>
                </Pressable>

                {/* TÍTULO */}
                <Text variant="headlineMedium">Crear cuenta</Text>
                <Text>Completa los datos para registrarte</Text>

                {/* NOMBRE */}
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            label="Nombre completo"
                            value={value}
                            onChangeText={onChange}
                            autoCapitalize="words"
                            error={!!errors.name}
                        />
                    )}
                />
                {errors.name && (
                    <HelperText type="error" visible>
                        {errors.name.message}
                    </HelperText>
                )}

                {/* EMAIL */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            label="Correo electrónico"
                            value={value}
                            onChangeText={onChange}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            error={!!errors.email}
                        />
                    )}
                />
                {errors.email && (
                    <HelperText type="error" visible>
                        {errors.email.message}
                    </HelperText>
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
                    <HelperText type="error" visible>
                        {errors.password.message}
                    </HelperText>
                )}

                {/* CONFIRM PASSWORD */}
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            label="Confirmar contraseña"
                            value={value}
                            onChangeText={onChange}
                            secureTextEntry
                            error={!!errors.confirmPassword}
                        />
                    )}
                />
                {errors.confirmPassword && (
                    <HelperText type="error" visible>
                        {errors.confirmPassword.message}
                    </HelperText>
                )}

                {/* BOTÓN REGISTRAR */}
                <Button
                    mode="contained"
                    onPress={handleSubmit(onSubmit)}
                    loading={isSubmitting}
                >
                    Registrarse
                </Button>

                {/* ERROR API */}
                {apiError && (
                    <HelperText type="error" visible>
                        {apiError}
                    </HelperText>
                )}
                {apiSucces && (
                    <HelperText type="info" visible>
                        {apiSucces}
                    </HelperText>
                )}

            </ScreenContainer>

        </>
    );

}