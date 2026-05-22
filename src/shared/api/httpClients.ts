import axios from "axios";
import { router } from "expo-router";
import { Platform } from "react-native";
import { deleteItem, getItem } from "../storage/secureStorage";
const STORAGE_KEY = "auth-storage";

// const BASE_URL =
//   Platform.OS === "android"
//     ? "http://10.0.2.2:3000/api"
//     : "http://localhost:3000/api";

const BASE_URL =
  Platform.OS === "android"
    ? "https://hometask-back.onrender.com/api"
    : "https://hometask-back.onrender.com/api";

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use(
  async (config) => {
    const raw = await getItem(STORAGE_KEY);

    if (raw) {
      const auth = JSON.parse(raw);
      if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);
httpClient.interceptors.response.use(
  (response) => {
    if (
      (response.data &&
        response.data.ok === false &&
        response.data.message === "Token inválido o expirado") ||
      response.data.message === "Token no proporcionado"
    ) {
      cerrarSesion();
    }

    return response;
  },
  (error) => {
    // Si el backend usa 401
    if (error.response?.status === 401) {
      cerrarSesion();
    }

    return Promise.reject(error);
  },
);
async function cerrarSesion() {
  try {
    await deleteItem(STORAGE_KEY);
    // Redirigir
    router.push("/(auth)/login");
  } catch (error) {
    console.error("Error limpiando sesión:", error);
  }
}
