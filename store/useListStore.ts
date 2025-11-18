import { create } from "zustand";
import type { List, ListItem, ListItemInput, ListContent } from "@/types/list";
import {
  createList as createListDB,
  deleteList as deleteListDB,
  getUserLists,
  toggleItemInList as toggleItemDB,
  removeItemFromList as removeItemDB,
  getOrCreateFavoritesList,
} from "@/db/lists";
import { FAVORITES_LIST_NAME } from "@/lib/utils";

interface ListState {
  lists: List[];
  favorites: List | null;

  loadLists: (userId: string) => Promise<void>;
  createList: (userId: string, name: string) => Promise<List>;
  deleteList: (listId: string) => Promise<void>;
  toggleItemInList: (listId: string, item: ListItemInput) => Promise<void>;
  removeItemFromList: (listId: string, itemId: string) => Promise<void>;
  isFavorite: (item: ListItemInput) => boolean;
  toggleFavorite: (userId: string, item: ListItemInput) => Promise<void>;
}

export const useListStore = create<ListState>((set, get) => ({
  lists: [],
  favorites: null,

  async loadLists(userId) {
    let lists = await getUserLists(userId);
    let favorites = lists.find((l) => l.name === FAVORITES_LIST_NAME) || null;

    // Yoksa otomatik oluştur
    if (!favorites) {
      const created = await getOrCreateFavoritesList(userId);
      favorites = { ...created, items: [] };
      lists = [favorites!, ...lists];
    }

    const otherLists = lists.filter((l) => l.name !== FAVORITES_LIST_NAME);

    set({
      lists: otherLists,
      favorites,
    });
  },

  async createList(userId, name) {
    if (name === FAVORITES_LIST_NAME) {
      throw new Error("Bu isimde bir liste oluşturamazsın.");
    }

    const newList = await createListDB(userId, name);

    set({
      lists: [newList, ...get().lists],
    });

    return newList;
  },

  async deleteList(listId) {
    if (get().favorites?.id === listId) {
      throw new Error("Favoriler listesi silinemez.");
    }

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

  isFavorite: (item) => {
    const fav = get().lists.find((l) => l.name === FAVORITES_LIST_NAME);
    if (!fav) return false;

    return fav.items.some((i) => {
      if ("word" in i.content && "word" in item.content)
        return i.content.word === item.content.word;

      if ("sentence" in i.content && "sentence" in item.content)
        return i.content.sentence === item.content.sentence;

      return false;
    });
  },

  async toggleFavorite(userId, item) {
    const fav = get().favorites;

    if (!fav) {
      const created = await getOrCreateFavoritesList(userId);
      set({ favorites: { ...created, items: [] } });
      return;
    }

    await get().toggleItemInList(fav.id, item);
  },
}));
