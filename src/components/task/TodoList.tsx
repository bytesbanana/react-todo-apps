import styles from "./TodoList.module.scss";
import { useQuery } from "react-query";

import { TodoItem } from "./TodoItem";
import { Todo } from "../../lib/definition";
import { useTaskStore } from "../../store/useTaskStore";
import apis from "../../lib/apis";

export const TodoList = () => {
  const { data: todos, isLoading } = useQuery<Todo[]>("todos", apis.getTodos);
  const { visibilityFilter } = useTaskStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.todoList}>
      {todos &&
        todos?.length > 0 &&
        todos
          .filter(({ completed }) => {
            switch (visibilityFilter) {
              case "done":
                return completed;
              case "undone":
                return !completed;
              default:
                return true;
            }
          })
          .map(({ id, title, completed }) => (
            <TodoItem
              key={id}
              todoId={id}
              title={title}
              completed={completed}
            />
          ))}
    </div>
  );
};
