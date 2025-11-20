import { supabase } from "@/lib/supabase";
import { LearnedWord } from "@/types/word";

export async function fetchLearnedWords(
  userId: string
): Promise<LearnedWord[]> {
  const { data, error } = await supabase
    .from("learned_words")
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return data;
}

export async function addLearnedWord(
  userId: string,
  word: string,
  meanings: string[],
  level: string
): Promise<LearnedWord> {
  const { data, error } = await supabase
    .from("learned_words")
    .insert([{ user_id: userId, word, meanings, level }])
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}

export async function removeLearnedWord(
  userId: string,
  word: string
): Promise<void> {
  const { error } = await supabase
    .from("learned_words")
    .delete()
    .eq("user_id", userId)
    .eq("word", word);

  if (error) throw new Error(error.message);
}
