// app/(main)/tasks/details.tsx

import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
    Pressable,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Text } from "react-native-paper";
import { z } from "zod";

import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { TaskUseCase } from "@/modules/tasks/application/task.usecase";
import { TaskApi } from "@/modules/tasks/infraestructure/task.api";
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { CategorySelect } from "@/shared/components/member/categorySelect";
import { MemberSelect } from "@/shared/components/member/memberSelect";
import { ErrorText } from "@/shared/components/tasks/ErrorText";
import { FieldLabel } from "@/shared/components/tasks/FieldLabel";
import { PriorityButton } from "@/shared/components/tasks/PriorityButton";
import { useCategoriesFamily } from "@/shared/hooks/useCategoriesFamily";
import { useMembersFamily } from "@/shared/hooks/useMembersFamily";
import { inputTextStyle, inputWrapperStyle } from "@/shared/theme/theme.conf";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform } from "react-native";
const schema = z.object({
    title: z.string().min(1, "El título es obligatorio"),
    description: z.string().min(1, "La descripción es obligatoria"),
    priority: z.enum(["low", "medium", "high"], {
        message: "Selecciona una prioridad",
    }),
    due_date: z.string().min(1, "La fecha límite es obligatoria"),
    assigned_to: z.string().min(1, "Debes asignar la tarea"),
    group_id: z.string().min(1, "El grupo es obligatorio"),
    category_id: z.string().min(1, "La categoría es obligatoria"),
});

type FormData = z.infer<typeof schema>;


export default function CreateTasksScreen() {
    const user = useAuthStore((s) => s.user);
    const memberid = useAuthStore((s) => s.memberid);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const { members, error_members, loading_members, reload } = useMembersFamily(memberid);
    const { categories, error_categories, loading_categories, reload: reloadCategories } = useCategoriesFamily(memberid);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        reset,

        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            priority: "medium",
            due_date: "",
            assigned_to: "",
            group_id: memberid ?? "",
            category_id: "",
        },
    });

    const assignedTo = watch("assigned_to");
    const priority = watch("priority");

    const onSubmit = async (data: FormData) => {
        try {
            const useCase = new TaskUseCase(new TaskApi());
            const response = await useCase.createTask(data);
            if (response.ok) {
                //poner mensje de exito 
                reset({
                    title: "",
                    description: "",
                    priority: "medium",
                    due_date: "",
                    assigned_to: "",
                    group_id: memberid ?? "",
                    category_id: "",
                });
                router.replace("/(main)/tasks");
            }
        } catch (error) {

        }
        // Aquí llamas tu servicio/API
        // await createTask(data);

        //  router.back();
    };

    return (
        <ScreenContainer>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20, paddingTop: 20 }}
            >
                {/* Header */}
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 34,
                    }}
                >
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="#111827"
                            onPress={() => router.replace("/(main)/tasks")}

                        />
                    </TouchableOpacity>

                    <Text
                        style={{
                            marginLeft: 24,
                            fontSize: 20,
                            fontWeight: "800",
                            color: "#111827",
                        }}
                    >
                        Nueva tarea
                    </Text>
                </View>

                {/* Título */}
                <FieldLabel label="Título de la tarea" />

                <Controller
                    control={control}
                    name="title"
                    render={({ field: { value, onChange } }) => (
                        <View style={inputWrapperStyle}>

                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Ej. Comprar materiales para el jardín"
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

                {errors.title && <ErrorText text={errors.title.message} />}

                {/* Descripción */}
                <FieldLabel label="Descripción" />

                <Controller
                    control={control}
                    name="description"
                    render={({ field: { value, onChange } }) => (
                        <View
                            style={{
                                minHeight: 140,
                                borderRadius: 14,
                                borderWidth: 1,
                                borderColor: "#E2E8F0",
                                backgroundColor: "#FFFFFF",
                                paddingHorizontal: 16,
                                paddingVertical: 14,
                            }}
                        >
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Detalla lo que se debe hacer en esta tarea..."
                                placeholderTextColor="#94A3B8"
                                multiline
                                textAlignVertical="top"
                                underlineColorAndroid="transparent"
                                style={[
                                    {
                                        minHeight: 110,
                                        fontSize: 16,
                                        color: "#111827",
                                        padding: 0,
                                    },

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

                {errors.description && <ErrorText text={errors.description.message} />}

                {/* Asignar */}
                <FieldLabel label="Asignar a" />

                <Pressable
                    onPress={() => {
                        if (user?.id) {
                            setValue("assigned_to", user.id, {
                                shouldValidate: true,
                            });
                        }
                    }}
                    style={{
                        height: 48,
                        borderRadius: 14,
                        backgroundColor: assignedTo === user?.id ? "#FFF1E8" : "#FFFFFF",
                        borderWidth: 1,
                        borderColor: assignedTo === user?.id ? "#FA541C" : "#E5E7EB",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 12,
                    }}
                >
                    <Text
                        style={{
                            color: assignedTo === user?.id ? "#FA541C" : "#334155",
                            fontWeight: "800",
                            fontSize: 15,
                        }}
                    >
                        Asignarme a mí
                    </Text>
                </Pressable>
                {members?.data?.length !== 0 && (
                    <MemberSelect
                        value={assignedTo}
                        members={members?.data}
                        onChange={(memberId) =>
                            setValue("assigned_to", memberId, {
                                shouldValidate: true,
                            })
                        }
                    />
                )}
                <View style={{ marginTop: 12 }} >

                    <CategorySelect
                        value={watch("category_id")}
                        categories={categories?.data ?? []}
                        onChange={(categoryId) =>
                            setValue("category_id", categoryId, {
                                shouldValidate: true,
                            })
                        }
                    />

                </View>
                {errors.assigned_to && <ErrorText text={errors.assigned_to.message} />}

                {/* Fecha */}
                <FieldLabel label="Fecha límite" />

                <Controller
                    control={control}
                    name="due_date"
                    render={({ field: { value, onChange } }) => (
                        <>
                            {Platform.OS === "web" ? (
                                <View style={{ position: "relative" }}>
                                    {/* Input visual */}
                                    <Pressable
                                        onPress={() => {
                                            const input = document.getElementById(
                                                "due-date-input"
                                            ) as HTMLInputElement | null;

                                            input?.showPicker?.();
                                            input?.click();
                                        }}
                                        style={inputWrapperStyle}
                                    >
                                        <Ionicons
                                            name="calendar-outline"
                                            size={20}
                                            color="#FA541C"
                                        />

                                        <Text
                                            style={{
                                                marginLeft: 12,
                                                fontSize: 16,
                                                color: value ? "#111827" : "#94A3B8",
                                            }}
                                        >
                                            {value || "Selecciona una fecha"}
                                        </Text>
                                    </Pressable>

                                    {/* Input real oculto */}
                                    <input
                                        id="due-date-input"
                                        type="date"
                                        value={value}
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={(e) => onChange(e.target.value)}
                                        style={{
                                            position: "absolute",
                                            opacity: 0,
                                            pointerEvents: "none",
                                            width: 0,
                                            height: 0,
                                        }}
                                    />
                                </View>
                            ) : (
                                <>
                                    <Pressable
                                        onPress={() => setShowDatePicker(true)}
                                        style={inputWrapperStyle}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                                flex: 1,
                                            }}
                                        >
                                            <Ionicons
                                                name="calendar-outline"
                                                size={20}
                                                color="#FA541C"
                                            />

                                            <Text
                                                style={{
                                                    marginLeft: 12,
                                                    fontSize: 16,
                                                    color: value ? "#111827" : "#94A3B8",
                                                }}
                                            >
                                                {value || "Selecciona una fecha"}
                                            </Text>
                                        </View>
                                    </Pressable>

                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={value ? new Date(value) : new Date()}
                                            mode="date"
                                            display="calendar"
                                            minimumDate={new Date()}
                                            onChange={(_, selectedDate) => {
                                                setShowDatePicker(false);

                                                if (selectedDate) {
                                                    const formattedDate = selectedDate
                                                        .toISOString()
                                                        .split("T")[0];

                                                    onChange(formattedDate);
                                                }
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}
                />

                {errors.due_date && <ErrorText text={errors.due_date.message} />}

                {/* Prioridad */}
                <FieldLabel label="Prioridad" />

                <View style={{ flexDirection: "row", gap: 12 }}>
                    <PriorityButton
                        label="Baja"
                        value="low"
                        active={priority === "low"}
                        color="#22C55E"
                        onPress={() => setValue("priority", "low")}
                    />

                    <PriorityButton
                        label="Media"
                        value="medium"
                        active={priority === "medium"}
                        color="#F59E0B"
                        onPress={() => setValue("priority", "medium")}
                    />

                    <PriorityButton
                        label="Alta"
                        value="high"
                        active={priority === "high"}
                        color="#EF4444"
                        onPress={() => setValue("priority", "high")}
                    />
                </View>

                {/* Guardar */}
                <TouchableOpacity
                    disabled={isSubmitting}
                    activeOpacity={0.85}
                    onPress={handleSubmit(onSubmit)}
                    style={{
                        height: 56,
                        borderRadius: 999,
                        backgroundColor: "#FA541C",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 48,
                        shadowColor: "#FA541C",
                        shadowOpacity: 0.28,
                        shadowRadius: 12,
                        shadowOffset: { width: 0, height: 8 },
                        elevation: 8,
                    }}
                >
                    <Text
                        style={{
                            color: "#FFFFFF",
                            fontSize: 16,
                            fontWeight: "800",
                        }}
                    >
                        Guardar tarea
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => router.replace("/(main)/tasks")}
                    style={{
                        height: 56,
                        borderRadius: 999,
                        backgroundColor: "#FDE9E2",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 14,
                    }}

                >
                    <Text
                        style={{
                            color: "#FA541C",
                            fontSize: 16,
                            fontWeight: "800",
                        }}
                    >
                        Cancelar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </ScreenContainer>
    );
}

