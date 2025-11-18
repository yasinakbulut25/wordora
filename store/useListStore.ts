import { create } from "zustand";
import type { List, ListItem, ListItemInput, ListContent } from "@/types/list";
import {
  createList as createListDB,
  deleteList as deleteListDB,
  getUserLists,
  toggleItemInList as toggleItemDB,
  removeItemFromList as removeItemDB,
} from "@/db/lists";

interface ListState {
  lists: List[];

  loadLists: (userId: string) => Promise<void>;
  createList: (userId: string, name: string) => Promise<List>;
  deleteList: (listId: string) => Promise<void>;
  toggleItemInList: (listId: string, item: ListItemInput) => Promise<void>;
  removeItemFromList: (listId: string, itemId: string) => Promise<void>;
}

export const useListStore = create<ListState>((set, get) => ({
  lists: [],

  async loadLists(userId) {
    const lists = await getUserLists(userId);
    set({ lists });
  },

  async createList(userId, name) {
    const newList = await createListDB(userId, name);

    set({
      lists: [newList, ...get().lists],
    });

    return newList;
  },

  async deleteList(listId) {
    await deleteListDB(listId);
    set({
      lists: get().lists.filter((l) => l.id !== listId),
    });
  },

  async toggleItemInList(listId, item) {
    await toggleItemDB(listId, item);

    const updatedLists = get().lists.map((list) => {
      if (list.id !== listId) return list;

      const exists = list.items.some((i) => {
        const existing = i.content as ListContent;
        const incoming = item.content as ListContent;

        if ("word" in existing && "word" in incoming)
          return existing.word === incoming.word;

        if ("sentence" in existing && "sentence" in incoming)
          return existing.sentence === incoming.sentence;

        return false;
      });

      if (exists) {
        return {
          ...list,
          items: list.items.filter((i) => {
            const existing = i.content as ListContent;
            const incoming = item.content as ListContent;

            if ("word" in existing && "word" in incoming)
              return existing.word !== incoming.word;

            if ("sentence" in existing && "sentence" in incoming)
              return existing.sentence !== incoming.sentence;

            return true;
          }),
        };
      }

      const newItem: ListItem = {
        id: crypto.randomUUID(),
        list_id: listId,
        created_at: new Date().toISOString(),
        type: item.type,
        content: item.content,
      };

      return {
        ...list,
        items: [...list.items, newItem],
      };
    });

    set({ lists: updatedLists });
  },

  async removeItemFromList(listId, itemId) {
    console.log("itemId", itemId);
    console.log("listId", listId);
    await removeItemDB(itemId);

    const updated = get().lists.map((list) =>
      list.id !== listId
        ? list
        : {
            ...list,
            items: list.items.filter((i) => i.id !== itemId),
          }
    );

    set({ lists: updated });
  },
}));
