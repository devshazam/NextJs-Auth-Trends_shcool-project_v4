"use client";

import { useEffect, useState } from "react";
import { editTodo } from "@/actions/todos/actions";
import { Input } from "@/components/ui/input";
import type { Todo } from "@/lib/interface";

export default function TodoData({ todo }: { todo: Todo }) {
  const [description, setDescription] = useState(todo.task);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null,
  );

  useEffect(() => {
    setDescription(todo.task);
  }, [todo.task]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDescription(newValue);

    // Clear previous timeout if exists
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout
    setTypingTimeout(
      setTimeout(async () => {
        await editTodo({ ...todo, task: e.target.value });
      }, 2000),
    );
  };

  return (
    <Input
      className="p-0 border-none focus-visible:ring-transparent"
      value={description}
      onChange={handleInputChange}
    />
  );
}
