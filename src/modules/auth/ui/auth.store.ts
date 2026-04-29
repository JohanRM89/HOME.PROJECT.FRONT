//Estado global

import { create } from "zustand";
import { AuthState } from "../domain/IAuthRepository";

import * as SecureStore from "expo-secure-store";

const STORAGE_KEY = "auth-storage";


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  expiresAt: null,

  login: async (data) => {
    // 1️ Guardar de forma segura
    await SecureStore.setItemAsync(
      STORAGE_KEY,
      JSON.stringify(data)
    );

    // 2️ Actualizar estado en memoria
    set({
      user: data.user || null,
      token: data.token,
      expiresAt: data.expiresAt,
    });
  },

  logout: async () => {
    await SecureStore.deleteItemAsync(STORAGE_KEY);
    set({
      user: null,
      token: null,
      expiresAt: null,
    });
  },
}));
