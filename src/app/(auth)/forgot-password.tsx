import { AuthUseCase } from "@/modules/auth/application/auth.usecase";
import { AuthApi } from "@/modules/auth/infrastructure/auth.api";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("Email inválido")
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordScreen() {
    const [apiError, setApiError] = useState<string | null>(null);
    const [apiSucces, setApiSucces] = useState<string | null>(null);
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: ""
        },
    });
    const onSubmit = async (data: FormData) => {
        setApiError(null);
        try {
            const useCase = new AuthUseCase(new AuthApi());
            const dataresposne = await useCase.sendEmailRestorePass(data.email);
            console.log(dataresposne)
            setApiSucces(dataresposne.message)
        } catch (error: any) {
            setApiError(error.message);
        }
    };

    const router = useRouter();

    return (
        <>
            <View style={{ padding: 24, gap: 16 }}>


                {/* BOTÓN VOLVER */}

                <Pressable
                    onPress={() => router.replace("/(auth)/login")}
                    style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
                >
                    <Ionicons name="chevron-back" size={24} color="#6750A4" />
                    <Text style={{ color: "#6750A4", marginLeft: 4 }}>
                        Volver
                    </Text>
                </Pressable>

                <Text variant="headlineMedium">
                    Recuperar contraseña
                </Text>
                <Text >
                    Ingresa tu correo y enviaremos las instrucciones para recuperar tu cuenta
                </Text>
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
                    <Text style={{ color: "red" }}>{errors.email.message}</Text>
                )}
                <Button mode="contained" onPress={handleSubmit(onSubmit)}
                    loading={isSubmitting}

                >
                    Recueprar contraseña
                </Button>
                {/* Mensaje de error */}
                {apiError && (
                    <HelperText type="error" visible={!!apiError}>
                        {apiError}
                    </HelperText>)}
                {apiSucces && (
                    <HelperText type="info" visible={!!apiSucces}>
                        {apiSucces}
                    </HelperText>)}
            </View>
        </>
    )


}