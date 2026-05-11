import axios from "axios";
import { Platform } from "react-native";
import { getItem } from "../storage/secureStorage";
const STORAGE_KEY = "auth-storage";

const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000/api"
    : "http://localhost:3000/api";

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
