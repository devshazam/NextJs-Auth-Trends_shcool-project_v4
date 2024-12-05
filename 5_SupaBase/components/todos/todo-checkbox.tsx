"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { onCheckChange } from "@/actions/todos/actions";
import type { Todo } from "@/lib/interface";

export default function TodoCheckbox({ todo }: { todo: Todo }) {
  return (
    <Checkbox
      className="mt-0.5 w-5 h-5"
      id={todo?.id as unknown as string}
      checked={todo?.is_complete}
      onCheckedChange={() => onCheckChange(todo)}
    />
  );
}
