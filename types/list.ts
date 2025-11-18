export type ItemType = "word" | "sentence";

export interface WordContent {
  word: string;
  meaning: string;
}

export interface SentenceContent {
  word: string;
  sentence: string;
  translation: string;
}

export type ListContent = WordContent | SentenceContent;

export interface ListItem {
  id: string;
  list_id: string;
  type: ItemType;
  content: ListContent;
  created_at?: string;
}

export interface WordListItem extends ListItem {
  type: "word";
  content: WordContent;
}

export interface SentenceListItem extends ListItem {
  type: "sentence";
  content: SentenceContent;
}
export interface List {
  id: string;
  user_id: string;
  name: string;
  items: ListItem[];
  created_at?: string;
}

export type ListItemInput = Omit<ListItem, "id" | "created_at" | "list_id">;

export function isWordItem(item: ListItem): item is WordListItem {
  return item.type === "word";
}

export function isSentenceItem(item: ListItem): item is SentenceListItem {
  return item.type === "sentence";
}
