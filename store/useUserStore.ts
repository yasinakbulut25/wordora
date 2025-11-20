import { create } from "zustand";
import { AuthUser } from "@/types/auth";

interface UserState {
  user: AuthUser | null;
  loading: boolean;

  setUser: (user: AuthUser | null) => void;
  logoutUser: () => void;
  setLoading: (state: boolean) => void;

  level: string | null;
  setLevel: (level: string) => void;
}

export const USER_LOCALSTORAGE_KEY = "wordora_auth";

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => {
    if (user) {
      set({
        user,
        loading: false,
      });
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
    }
  },

  logoutUser: () => {
    set({
      user: null,
      loading: false,
    });
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
  },

  setLoading: (loading) => set({ loading }),

  level: null,
  setLevel: (level) => {
    localStorage.setItem("wordora_level", level);
    set({ level });
  },
}));
