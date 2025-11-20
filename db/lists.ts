import { supabase } from "@/lib/supabase";
import { FAVORITES_LIST_NAME } from "@/lib/utils";
import type { List, ListItem, ListContent, ItemType } from "@/types/list";

export async function getUserLists(userId: string): Promise<List[]> {
  const { data, error } = await supabase
    .from("custom_lists")
    .select(
      `
      id,
      user_id,
      name,
      created_at,
      list_items (
        id,
        list_id,
        type,
        content,
        created_at
      )
    `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (
    data?.map((list) => ({
      id: list.id,
      user_id: list.user_id,
      name: list.name,
      created_at: list.created_at,
      items: (list.list_items || []).map((i) => ({
        id: i.id,
        list_id: i.list_id,
        type: i.type as ItemType,
        content: i.content as ListContent,
        created_at: i.created_at,
      })),
    })) ?? []
  );
}

export async function createList(userId: string, name: string): Promise<List> {
  if (name === FAVORITES_LIST_NAME) {
    throw new Error("Bu isimde liste oluşturamazsın.");
  }

  const { data, error } = await supabase
    .from("custom_lists")
    .insert([{ user_id: userId, name }])
    .select("id, user_id, name, created_at")
    .single();

  if (error) throw new Error(error.message);

  return { ...data, items: [] };
}

export async function deleteList(listId: string): Promise<void> {
  const { error } = await supabase
    .from("custom_lists")
    .delete()
    .eq("id", listId);
  if (error) throw new Error(error.message);
}

export async function toggleItemInList(
  listId: string,
  item: Omit<ListItem, "id" | "list_id" | "created_at">
): Promise<void> {
  const { data: existing, error: fetchError } = await supabase
    .from("list_items")
    .select("id, content")
    .eq("list_id", listId);

  if (fetchError) throw new Error(fetchError.message);

  const isExist = existing?.some((i) => {
    const content = i.content as ListContent;
    const newContent = item.content as ListContent;

    if ("word" in content && "word" in newContent)
      return content.word === newContent.word;
    if ("sentence" in content && "sentence" in newContent)
      return content.sentence === newContent.sentence;

    return false;
  });

  if (isExist) {
    const found = existing?.find((i) => {
      const content = i.content as ListContent;
      const newContent = item.content as ListContent;

      if ("word" in content && "word" in newContent)
        return content.word === newContent.word;
      if ("sentence" in content && "sentence" in newContent)
        return content.sentence === newContent.sentence;

      return false;
    });

    if (found) {
      const { error } = await supabase
        .from("list_items")
        .delete()
        .eq("id", found.id);
      if (error) throw new Error(error.message);
    }
  } else {
    const { error } = await supabase.from("list_items").insert([
      {
        list_id: listId,
        type: item.type,
        content: item.content,
      },
    ]);
    if (error) throw new Error(error.message);
  }
}

export async function removeItemFromList(itemId: string): Promise<void> {
  const { error } = await supabase.from("list_items").delete().eq("id", itemId);

  if (error) throw new Error(error.message);
}

export async function getOrCreateFavoritesList(userId: string) {
  const { data: existing } = await supabase
    .from("custom_lists")
    .select("*")
    .eq("user_id", userId)
    .eq("name", FAVORITES_LIST_NAME)
    .maybeSingle();

  if (existing) return existing;

  const { data: created, error } = await supabase
    .from("custom_lists")
    .insert([{ user_id: userId, name: FAVORITES_LIST_NAME }])
    .select()
    .maybeSingle();

  if (error) throw new Error(error.message);

  return created;
}
