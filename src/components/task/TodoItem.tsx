import { ComponentProps } from "react";
import styles from "./TodoItem.module.scss";
import GgSpinner from "../ui/Icon";
import clsx from "clsx";
import { useTodoMutation } from "../../hooks/useTodoMutation";

interface TodoItemProps extends ComponentProps<"div"> {
  todoId: number;
  title: string;
  completed: boolean;
}

export const TodoItem = ({ todoId: id, title, completed }: TodoItemProps) => {
  const { updateTodo, deleteTodo, isMutating } = useTodoMutation();

  return (
    <div key={id} className={styles.todoItem}>
      <div
        className={clsx(
          styles.todoItemCheckbox,
          isMutating && styles.textMuted
        )}
      >
        {isMutating && <GgSpinner className={styles.spinner} />}
        {!isMutating && (
          <input
            type="checkbox"
            id={`${id}-completed`}
            name={`${id}-completed`}
            checked={!!completed}
            onChange={(e) =>
              updateTodo.mutate({
                id,
                title,
                completed: e.target.checked,
              })
            }
          />
        )}
        {title}
      </div>
      <div>
        <button disabled={isMutating}>Edit</button>
        <button disabled={isMutating} onClick={() => deleteTodo.mutate(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
