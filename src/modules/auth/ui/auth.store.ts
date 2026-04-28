//Estado global

import { create } from "zustand";
import { AuthState } from "../domain/User";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
