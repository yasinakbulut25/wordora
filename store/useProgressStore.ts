"use client";

import { create } from "zustand";
import {
  fetchLearnedWords,
  addLearnedWord,
  removeLearnedWord,
} from "@/db/learned";
import { LearnedWord } from "@/types/word";

interface ProgressState {
  learned: LearnedWord[];
  loading: boolean;

  loadLearned: (userId: string) => Promise<void>;
  toggleLearned: (
    userId: string,
    level: string,
    word: string,
    meanings: string[]
  ) => Promise<void>;
  isLearned: (word: string) => boolean;
  getProgress: (totalWords: number) => number;
  getLevelProgress: (level: string, totalWords: number) => number;
  getLearnedCount: (level: string) => number;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  learned: [],
  loading: false,

  loadLearned: async (userId) => {
    set({ loading: true });
    const data = await fetchLearnedWords(userId);
    set({ learned: data, loading: false });
  },

  toggleLearned: async (userId, level, word, meanings) => {
    const list = get().learned;
    const exists = list.find((l) => l.word === word);

    if (exists) {
      await removeLearnedWord(userId, word);
      set({ learned: list.filter((l) => l.word !== word) });
      return;
    }

    const newItem = await addLearnedWord(userId, word, meanings, level);
    set({ learned: [...list, newItem] });
  },

  isLearned: (word) => {
    return get().learned.some((l) => l.word === word);
  },

  getProgress: (totalWords) => {
    const count = get().learned.length;
    return totalWords > 0 ? Math.round((count / totalWords) * 100) : 0;
  },

  getLevelProgress: (level, totalWords) => {
    const learned = get().learned.filter((l) => l.level === level);
    const count = learned.length;
    return totalWords ? Math.round((count / totalWords) * 100) : 0;
  },

  getLearnedCount: (level) => {
    console.log("get().learned", get().learned);
    return get().learned.filter((l) => l.level === level).length;
  },
}));
