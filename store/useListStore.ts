import { create } from "zustand";

export interface ListItem {
  id: string;
  word: string;
  type: "word" | "sentence";
  meaning?: string;
  example?: string;
}

export interface List {
  id: string;
  name: string;
  items: ListItem[];
}

interface ListState {
  lists: List[];
  createList: (name: string, id?: string) => void;
  deleteList: (id: string) => void;
  toggleItemInList: (listId: string, item: ListItem) => void;
}

export const useListStore = create<ListState>((set) => ({
  lists: [],
  createList: (name, id) =>
    set((state) => ({
      lists: [
        ...state.lists,
        { id: id || crypto.randomUUID(), name, items: [] },
      ],
    })),

  deleteList: (id) =>
    set((state) => ({
      lists: state.lists.filter((list) => list.id !== id),
    })),

  toggleItemInList: (listId, item) =>
    set((state) => ({
      lists: state.lists.map((list) =>
        list.id === listId
          ? list.items.some((i) => i.word === item.word && i.type === item.type)
            ? {
                ...list,
                items: list.items.filter(
                  (i) => !(i.word === item.word && i.type === item.type)
                ),
              }
            : { ...list, items: [...list.items, item] }
          : list
      ),
    })),
}));
