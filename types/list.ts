import { WordData } from "./word";

export type List = {
  id: string;
  name: string;
  items: WordData[];
};

export type ListState = {
  lists: List[];
  addList: (name: string) => void;
  addToList: (listId: string, item: WordData) => void;
};
