import { ListState } from "@/types/list";
import { create } from "zustand";

export const useListStore = create<ListState>((set) => ({
  lists: [],
  addList: (name) =>
    set((state) => ({
      lists: [...state.lists, { id: Date.now().toString(), name, items: [] }],
    })),
  addToList: (listId, item) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId ? { ...list, items: [...list.items, item] } : list
      ),
    })),
}));
