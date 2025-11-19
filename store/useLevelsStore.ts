import { WordData } from "@/types/word";
import { create } from "zustand";

export type Levels = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

interface LevelsState {
  levels: Record<Levels, WordData[]>;
  setLevelsData: () => void;
}

type LevelResult = {
  level: Levels;
  words: WordData[];
};

export const useLevelsStore = create<LevelsState>((set, get) => ({
  levels: {
    A1: [],
    A2: [],
    B1: [],
    B2: [],
    C1: [],
    C2: [],
  },

  setLevelsData: async () => {
    const levelValues: Levels[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

    const results = await Promise.all(
      levelValues.map(async (level): Promise<LevelResult> => {
        const res = await fetch(`/data/levels/${level.toLowerCase()}.json`, {
          cache: "no-store",
        });

        const words: WordData[] = await res.json();

        return { level, words };
      })
    );

    const newLevels: Record<Levels, WordData[]> = {
      A1: [],
      A2: [],
      B1: [],
      B2: [],
      C1: [],
      C2: [],
    };

    results.forEach(({ level, words }) => {
      newLevels[level] = words;
    });

    set({ levels: newLevels });
  },
}));
