"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { Todo } from "@/lib/interface";

export async function addTodo(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("todos")
    .insert([
      {
        user_id: user?.id,
        task: formData.get("task") as string,
        is_complete: false,
        inserted_at: new Date(),
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function editTodo(todo: Todo) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("todos")
    .update({ task: todo.task })
    .eq("id", todo.id)
    .eq("user_id", user?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteTodo(id: number) {
  const supabase = createClient();

  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function deleteCompletedTodos() {
  const supabase = createClient();

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("is_complete", true);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function deleteAllTodos() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("user_id", user?.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}

export async function onCheckChange(todo: Todo) {
  const supabase = createClient();

  const { error } = await supabase
    .from("todos")
    .update({ is_complete: !todo?.is_complete })
    .eq("id", todo?.id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
}
