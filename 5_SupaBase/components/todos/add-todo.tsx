"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addTodo } from "@/actions/todos/actions";

export default function AddTodo() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      className="flex outline-none items-center gap-2"
      ref={ref}
      action={async (formData) => {
        await addTodo(formData);
        ref.current?.reset();
      }}
    >
      <Button className="min-w-5 h-5 p-0 rounded-sm">
        <PlusIcon className="w-4 h-4" />
      </Button>
      <Input
        id="task"
        className="p-0 border-none focus-visible:ring-transparent"
        name="task"
        placeholder="Add new task"
        required
      />
    </form>
  );
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
