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
import { ScreenContainer } from "@/shared/components/common/ScreenContainer";
import { ErrorText } from "@/shared/components/tasks/ErrorText";
import { FieldLabel } from "@/shared/components/tasks/FieldLabel";
import { PriorityButton } from "@/shared/components/tasks/PriorityButton";
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

const members = [
    {
        id: "6f4d5b66-c1ff-4615-89fb-fafee0fafeee",
        name: "Ana",
    },
    {
        id: "7f4d5b66-c1ff-4615-89fb-fafee0fafeee",
        name: "Carlos",
    },
    {
        id: "8f4d5b66-c1ff-4615-89fb-fafee0fafeee",
        name: "María",
    },
];
export default function CreateTasksScreen() {
    const user = useAuthStore((s) => s.user);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const {
        control,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            priority: "medium",
            due_date: "",
            assigned_to: "",
            group_id: "b5fac823-7305-46e9-ad30-a8d6c32fe57b",
            category_id: "b672dfe8-31c1-4c10-87f0-e59baba08922",
        },
    });

    const assignedTo = watch("assigned_to");
    const priority = watch("priority");

    const onSubmit = async (data: FormData) => {
        console.log("Nueva tarea:", data);

        // Aquí llamas tu servicio/API
        // await createTask(data);

        router.back();
    };

    return (
        <ScreenContainer>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
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
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            placeholder="Ej. Comprar materiales para el jardín"
                            placeholderTextColor="#94A3B8"
                            style={inputStyle}
                        />
                    )}
                />

                {errors.title && <ErrorText text={errors.title.message} />}

                {/* Descripción */}
                <FieldLabel label="Descripción" />

                <Controller
                    control={control}
                    name="description"
                    render={({ field: { value, onChange } }) => (
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            placeholder="Detalla lo que se debe hacer en esta tarea..."
                            placeholderTextColor="#94A3B8"
                            multiline
                            textAlignVertical="top"
                            style={{
                                ...inputStyle,
                                height: 120,
                                paddingTop: 18,
                            }}
                        />
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

                <View style={{ flexDirection: "row", gap: 10, marginBottom: 8 }}>
                    {members.map((member) => {
                        const active = assignedTo === member.id;

                        return (
                            <Pressable
                                key={member.id}
                                onPress={() =>
                                    setValue("assigned_to", member.id, {
                                        shouldValidate: true,
                                    })
                                }
                                style={{
                                    paddingHorizontal: 14,
                                    height: 42,
                                    borderRadius: 999,
                                    borderWidth: 1,
                                    borderColor: active ? "#FA541C" : "#E5E7EB",
                                    backgroundColor: active ? "#FFF1E8" : "#FFFFFF",
                                    justifyContent: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        color: active ? "#FA541C" : "#64748B",
                                        fontWeight: "700",
                                    }}
                                >
                                    {member.name}
                                </Text>
                            </Pressable>
                        );
                    })}
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
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="yyyy-mm-dd"
                                    placeholderTextColor="#94A3B8"
                                    style={inputStyle}
                                />
                            ) : (
                                <>
                                    <Pressable
                                        onPress={() => setShowDatePicker(true)}
                                        style={{
                                            height: 56,
                                            borderRadius: 12,
                                            borderWidth: 1,
                                            borderColor: "#FED7C3",
                                            backgroundColor: "#FFFFFF",
                                            paddingHorizontal: 16,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: value ? "#111827" : "#94A3B8",
                                            }}
                                        >
                                            {value || "Selecciona una fecha"}
                                        </Text>

                                        <Ionicons name="calendar-outline" size={22} color="#FA541C" />
                                    </Pressable>

                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={value ? new Date(value) : new Date()}
                                            mode="date"
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

const inputStyle = {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FED7C3",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
};