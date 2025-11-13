import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressState = {
  learnedWords: Record<string, string[]>; // { a1: ["apple", "book"], b1: [...] }
  toggleLearned: (level: string, word: string) => void;
  getProgress: (level: string, totalWords: number) => number;
  isLearned: (level: string, word: string) => boolean;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      learnedWords: {},

      toggleLearned: (level, word) =>
        set((state) => {
          const levelKey = level.toLowerCase();
          const currentLevelWords = state.learnedWords[levelKey] || [];

          const updatedLevelWords = currentLevelWords.includes(word)
            ? currentLevelWords.filter((w) => w !== word)
            : [...currentLevelWords, word];

          return {
            learnedWords: {
              ...state.learnedWords,
              [levelKey]: updatedLevelWords,
            },
          };
        }),

      getProgress: (level, totalWords) => {
        const levelKey = level.toLowerCase();
        const learnedCount = get().learnedWords[levelKey]?.length || 0;
        return totalWords > 0
          ? Math.round((learnedCount / totalWords) * 100)
          : 0;
      },

      isLearned: (level, word) => {
        const levelKey = level.toLowerCase();
        const list = get().learnedWords[levelKey] || [];
        return list.includes(word);
      },
    }),
    {
      name: "wordora-progress", // 🔹 localStorage key adı
      partialize: (state) => ({ learnedWords: state.learnedWords }), // sadece bu alan saklanacak
    }
  )
);
