//Estado global

import { create } from "zustand";
import { AuthState } from "../domain/IAuthRepository";

import * as storage from "@/shared/storage/secureStorage";

const STORAGE_KEY = "auth-storage";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  expiresAt: null,
  isHydrated: false,
  memberid: null,

  login: async (data) => {
    // 1️ Guardar de forma segura
    await storage.setItem(STORAGE_KEY, JSON.stringify(data));
    // 2️ Actualizar estado en memoria
    set({
      user: data.user || null,
      token: data.token,
      expiresAt: data.expiresAt,
      isHydrated: true,
      memberid: data.memberid,
    });
  },

  logout: async () => {
    await storage.deleteItem(STORAGE_KEY);
    set({
      user: null,
      token: null,
      expiresAt: null,
      isHydrated: true,
      memberid: null,
    });
  },

  hydrate: (data: any) => {
    if (data) {
      set({
        user: data.user,
        token: data.token,
        expiresAt: data.expiresAt,
        memberid: data.memberid,
        isHydrated: true,
      });
    } else {
      set({
        user: null,
        token: null,
        expiresAt: null,
        memberid: null,
        isHydrated: true,
      });
    }
  },
}));
