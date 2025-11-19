import { create } from "zustand";

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

interface UserState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser) => void;
  logout: () => void;
  loadUserFromStorage: () => void;

  level: string | null;
  setLevel: (level: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => {
    localStorage.setItem("wordora_user", JSON.stringify(user));
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("wordora_user");
    set({ user: null, isAuthenticated: false });
  },

  loadUserFromStorage: () => {
    const stored = localStorage.getItem("wordora_user");
    if (stored) {
      const user = JSON.parse(stored);
      set({ user, isAuthenticated: true });
    }
  },

  level: null,
  setLevel: (level) => {
    localStorage.setItem("wordora_level", level);
    set({ level });
  },
}));
