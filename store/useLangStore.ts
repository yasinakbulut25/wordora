import { create } from "zustand";

export type LangType = "TR" | "EN";

interface LangState {
  lang: LangType;
  setLang: (lang: LangType) => void;
}

const localStorageKey = "wordora_lang";

export const useLangStore = create<LangState>((set) => ({
  lang:
    typeof window !== "undefined"
      ? (localStorage.getItem(localStorageKey) as LangType) || "TR"
      : "TR",
  setLang: (lang) => {
    set({ lang });
    if (typeof window !== "undefined") {
      localStorage.setItem(localStorageKey, lang);
    }
  },
}));
