export type Example = {
  en: string;
  tr: string;
};

export type WordData = {
  word: string;
  meanings: string[];
  examples: Example[];
};

export interface LearnedWord {
  id: string;
  user_id: string;
  word: string;
  level: string;
  created_at: string;
}
