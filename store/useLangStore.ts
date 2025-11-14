import { create } from "zustand";

type Lang = "TR" | "EN";

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLangStore = create<LangState>((set) => ({
  lang: "TR",
  setLang: (lang) => set({ lang }),
}));
