import { LoginUseCase } from "@/modules/auth/application/login.usecase";
import { AuthApi } from "@/modules/auth/infrastructure/auth.api";
import { useAuthStore } from "@/modules/auth/ui/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginScreen() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const loginStore = useAuthStore((s) => s.login);

  const onSubmit = async (data: any) => {
    const useCase = new LoginUseCase(new AuthApi());
    const user = await useCase.execute(data.email, data.password);
    loginStore(user);
  };

  return (
    <View style={{ padding: 24 }}>
      <Text variant="headlineMedium">Iniciar sesión</Text>

      <TextInput label="Email" />
      <TextInput label="Contraseña" secureTextEntry />

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Entrar
      </Button>
    </View>
  );
}
