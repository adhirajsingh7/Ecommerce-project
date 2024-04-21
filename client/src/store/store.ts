import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: {},
  setUser: (newUser) => set({ user: newUser }),
}));
