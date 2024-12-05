import TodoData from "./todo-data";
import TodoCheckbox from "./todo-checkbox";
import DeleteTodo from "./delete-todo";

import { editTodo } from "@/actions/todos/actions";
import type { Todo } from "@/lib/interface";

export default async function Todo({ todo }: { todo: Todo }) {
  return (
    <div className="flex items-center gap-2">
      <form
        className="flex-1 flex items-center gap-2"
        action={async () => {
          "use server";

          await editTodo(todo);
        }}
      >
        <TodoCheckbox todo={todo} />
        <TodoData todo={todo} />
      </form>
      <DeleteTodo id={todo.id} />
    </div>
  );
}
