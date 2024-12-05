"use client";

import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import { deleteTodo } from "@/actions/todos/actions";

export default function DeleteTodo({ id }: { id: number }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-4 h-4"
      onClick={async () => {
        await deleteTodo(id);
      }}
    >
      <IoClose />
    </Button>
  );
}
