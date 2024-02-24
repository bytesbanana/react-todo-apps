import { ComponentProps } from "react";
import styles from "./TodoItem.module.scss";
import GgSpinner from "../ui/Icon";
import clsx from "clsx";
import { useTodoMutation } from "./useTodoMutation";

interface TodoItemProps extends ComponentProps<"div"> {
  todoId: number;
  title: string;
  completed: boolean;
}

export const TodoItem = ({ todoId: id, title, completed }: TodoItemProps) => {
  // const queryClient = useQueryClient();
  const { updateTodo, deleteTodo, isMutating } = useTodoMutation();

  // const updateTodoMutation = useMutation(
  //   ({ id, title, completed }: Todo) =>
  //     putTodo({
  //       id,
  //       title,
  //       completed,
  //     }),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("todos");
  //     },
  //   }
  // );

  // const deleteTodoMutation = useMutation((id: number) => deleteTodo(id), {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("todos");
  //   },
  // });

  // const isMutating =
  //   updateTodoMutation.isLoading || deleteTodoMutation.isLoading;

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
      {/* <button className={styles.todoItemMenuButton}> */}
      {/* <SolarMenuDotsBold /> */}
      {/* <ul className={styles.todoItemDropdown}>
          <li>Edit</li>
          <li>Delete</li>
        </ul> */}
      {/* </button> */}
    </div>
  );
};
