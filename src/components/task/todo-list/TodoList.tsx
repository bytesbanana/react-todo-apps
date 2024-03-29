import styles from "./TodoList.module.scss";
import { useQuery } from "react-query";

import { TodoItem } from "../todo-item/TodoItem";
import { Todo } from "../../../lib/definition";
import { useTaskStore } from "../../../store/useTaskStore";
import apis from "../../../lib/apis";
import { useMemo } from "react";
import { AddTodoInput } from "../add-todo-input/AddTodoInput";

export const TodoList = () => {
  const { data: todos, isLoading, status } = useQuery<Todo[]>("todos", () => {
    return apis.getTodos() || [];
  });
  const { visibilityFilter } = useTaskStore();

  const filteredTodos = useMemo(
    () =>
      todos?.filter(({ completed }) => {
        switch (visibilityFilter) {
          case "done":
            return completed;
          case "undone":
            return !completed;
          default:
            return true;
        }
      }) || [],
    [todos, visibilityFilter]
  );

  if (isLoading || !todos && status !== 'error') {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.todoList}>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      {filteredTodos.length === 0 && (
        <p className={styles.noTaskMsg}>There is no task here.</p>
      )}
      <AddTodoInput />
    </div>
  );
};
