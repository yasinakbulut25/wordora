import { create } from "zustand";

interface UserState {
  level: string | null;
  setLevel: (level: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  level: null,
  setLevel: (level) => set({ level }),
}));
