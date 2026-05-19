// src/app/(auth)/family-setup.tsx

import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { MemberCase } from "@/modules/members/application/member.case";
import { MemeberApi } from "@/modules/members/infrastructure/memeber.api";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { inputTextStyle, inputWrapper, labelStyle, primaryButton, primaryButtonText } from "@/shared/theme/theme.conf";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
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

const createSchema = z.object({
    name: z.string().min(1, "El campo es obligatorio"),
});
const familyUseCase = new MemberCase(new MemeberApi());


type CreateForm = z.infer<typeof createSchema>;

export default function FamilySetupScreen() {
    const [mode, setMode] = useState<"create" | "join">("create");
    const setMemberId = useAuthStore((s) => s.setMemberId);
    const isCreate = mode === "create";

    const changeMode = (newMode: "create" | "join") => {
        setMode(newMode);

        createForm.reset();

        setApiError(null);
    };
    const [apiError, setApiError] = useState<string | null>(null);

    const createForm = useForm<CreateForm>({
        resolver: zodResolver(createSchema),
        defaultValues: {
            name: "",
        },
    });


    const createFamily = async (data: CreateForm) => {
        setApiError(null);

        try {
            const payload = {
                name: data.name,
            };
            const dataResponse = await familyUseCase.CreateFamily(payload);
            if (dataResponse) {
                await setMemberId(dataResponse.id);
                router.replace("/(main)");

            }
        } catch (error: any) {
            setApiError(error.message);
        }
    };

    const joinFamily = async (data: CreateForm) => {
        setApiError(null);

        try {
            const payload = {
                codigo: data.name,
            };
            const dataResponse = await familyUseCase.JoinFamily(payload);
            if (dataResponse) {
                await setMemberId(dataResponse.id);
                router.replace("/(main)");

            }

        } catch (error: any) {
            setApiError(error.message);
        }
    };


    return (
        <ScreenContainer noPadding>
            <View style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: "center",
                        paddingHorizontal: 20,
                        paddingVertical: 54,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: 18,
                            borderWidth: 1,
                            borderColor: "#EEF2F7",
                            padding: 24,
                            shadowColor: "#000",
                            shadowOpacity: 0.07,
                            shadowRadius: 18,
                            shadowOffset: { width: 0, height: 10 },
                            elevation: 5,
                        }}
                    >
                        <View
                            style={{
                                width: 76,
                                height: 76,
                                borderRadius: 22,
                                backgroundColor: "#FFF1E8",
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                                marginBottom: 22,
                            }}
                        >
                            <Ionicons name="home-outline" size={38} color="#FA541C" />
                        </View>

                        <Text
                            style={{
                                fontSize: 28,
                                fontWeight: "900",
                                color: "#111827",
                                textAlign: "center",
                                letterSpacing: -0.6,
                            }}
                        >
                            Configura tu hogar
                        </Text>

                        <Text
                            style={{
                                marginTop: 10,
                                fontSize: 16,
                                lineHeight: 24,
                                color: "#64748B",
                                textAlign: "center",
                                marginBottom: 26,
                            }}
                        >
                            Crea una familia para administrarla o únete a una existente con
                            un código de invitación.
                        </Text>

                        <View
                            style={{
                                backgroundColor: "#F8FAFC",
                                borderRadius: 999,
                                padding: 4,
                                flexDirection: "row",
                                marginBottom: 26,
                            }}
                        >
                            <ModeButton
                                label="Crear familia"
                                active={isCreate}
                                onPress={() => changeMode("create")}
                            />

                            <ModeButton
                                label="Unirme"
                                active={!isCreate}
                                onPress={() => changeMode("join")}
                            />
                        </View>

                        {isCreate ? (
                            <>
                                <Text style={labelStyle}>Nombre de la familia</Text>

                                <Controller
                                    control={createForm.control}
                                    name="name"
                                    render={({ field: { value, onChange } }) => (
                                        <View style={inputWrapper}>
                                            <Ionicons name="people-outline" size={20} color="#94A3B8" />

                                            <RNTextInput
                                                value={value}
                                                onChangeText={onChange}
                                                placeholder="Ej. Familia Gómez"
                                                placeholderTextColor="#94A3B8"
                                                style={[
                                                    inputTextStyle,
                                                    Platform.OS === "web" &&
                                                    ({
                                                        outlineWidth: 0,
                                                        outlineColor: "transparent",
                                                    } as any),
                                                ]} />
                                        </View>
                                    )}
                                />

                                {createForm.formState.errors.name && (
                                    <ErrorText text={createForm.formState.errors.name.message} />
                                )}

                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    disabled={createForm.formState.isSubmitting}
                                    onPress={createForm.handleSubmit(createFamily)}
                                    style={primaryButton}
                                >
                                    <Text style={primaryButtonText}>
                                        {createForm.formState.isSubmitting
                                            ? "Creando..."
                                            : "Crear mi familia"}
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={labelStyle}>Código de invitación</Text>

                                <Controller
                                    control={createForm.control}
                                    name="name"
                                    render={({ field: { value, onChange } }) => (
                                        <View style={inputWrapper}>
                                            <Ionicons name="key-outline" size={20} color="#94A3B8" />

                                            <RNTextInput
                                                value={value}
                                                onChangeText={onChange}
                                                placeholder="Ej. Y1E6Y7"
                                                placeholderTextColor="#94A3B8"

                                                style={[
                                                    inputTextStyle,
                                                    Platform.OS === "web" &&
                                                    ({
                                                        outlineWidth: 0,
                                                        outlineColor: "transparent",
                                                    } as any),
                                                ]} />
                                        </View>
                                    )}
                                />



                                {createForm.formState.errors.name && (
                                    <ErrorText text={createForm.formState.errors.name.message} />
                                )}

                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    disabled={createForm.formState.isSubmitting}
                                    onPress={createForm.handleSubmit(joinFamily)}
                                    style={primaryButton}
                                >
                                    <Text style={primaryButtonText}>
                                        {createForm.formState.isSubmitting
                                            ? "Uniendo..."
                                            : "Unirme a una familia"}
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}

                        {apiError && (
                            <HelperText type="error" visible style={{ textAlign: "center" }}>
                                {apiError}
                            </HelperText>
                        )}

                        <TouchableOpacity
                            activeOpacity={0.85}
                            onPress={() => router.replace("/(auth)/login")}
                            style={{
                                marginTop: 22,
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    color: "#64748B",
                                    fontSize: 14,
                                    fontWeight: "700",
                                }}
                            >
                                Cerrar sesión y volver al login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </ScreenContainer>
    );
}

function ModeButton({
    label,
    active,
    onPress,
}: {
    label: string;
    active: boolean;
    onPress: () => void;
}) {
    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={{
                flex: 1,
                height: 42,
                borderRadius: 999,
                backgroundColor: active ? "#FA541C" : "transparent",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text
                style={{
                    color: active ? "#FFFFFF" : "#64748B",
                    fontSize: 14,
                    fontWeight: "900",
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}

function ErrorText({ text }: { text?: string }) {
    if (!text) return null;

    return (
        <Text
            style={{
                color: "#EF4444",
                fontSize: 12,
                marginTop: 6,
            }}
        >
            {text}
        </Text>
    );
}

