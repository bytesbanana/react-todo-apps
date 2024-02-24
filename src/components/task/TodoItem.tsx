import { ComponentProps, useState } from "react";
import styles from "./TodoItem.module.scss";
import GgSpinner from "../ui/Icon";
import clsx from "clsx";
import { useTodoMutation } from "../../hooks/useTodoMutation";
import { Todo } from "../../lib/definition";

type InputMode = "Default" | "Edit";

const LoadingSpinner = () => <GgSpinner className={styles.spinner} />;

interface TextInputProps {
  title: string;
  isLoading: boolean;
  onSubmit: (newTitle: string) => void;
}

const TextInput = ({ title, isLoading, onSubmit }: TextInputProps) => {
  const [newTitle, setNewTitle] = useState(title);
  return (
    <div className={styles.todoItemTextInput}>
      {isLoading && <LoadingSpinner />}
      <input
        type="text"
        className={styles.textInput}
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        disabled={isLoading}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit(newTitle);
          }
        }}
      />
      <button disabled={isLoading} onClick={() => onSubmit(newTitle)}>
        Save
      </button>
    </div>
  );
};

interface CheckboxInputProps {
  todo: Todo;
  isLoading: boolean;
  onToggleCheckbox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const CheckboxInput = ({
  todo,
  isLoading,
  onToggleCheckbox,
  onDeleteClick,
  onEditClick,
}: CheckboxInputProps) => {
  const { id, title, completed } = todo;

  return (
    <>
      <div
        className={clsx(styles.todoItemCheckbox, isLoading && styles.textMuted)}
      >
        {isLoading && <LoadingSpinner />}
        <input
          type="checkbox"
          id={`${id}-completed`}
          name={`${id}-completed`}
          checked={!!completed}
          onChange={onToggleCheckbox}
        />
        {title}
      </div>
      <div>
        <button disabled={isLoading} onClick={onEditClick}>
          Edit
        </button>
        <button disabled={isLoading} onClick={onDeleteClick}>
          Delete
        </button>
      </div>
    </>
  );
};

interface TodoItemProps extends ComponentProps<"div"> {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { id, title } = todo;
  const [mode, setMode] = useState<InputMode>("Default");
  const { updateTodo, deleteTodo, isMutating } = useTodoMutation({
    onUpdateSuccess() {
      if (mode === "Edit") {
        setMode("Default");
      }
    },
  });

  return (
    <div key={id} className={styles.todoItem}>
      {mode === "Default" && (
        <CheckboxInput
          todo={todo}
          isLoading={isMutating}
          onToggleCheckbox={(e) => {
            updateTodo.mutate({
              ...todo,
              completed: e.target.checked,
            });
          }}
          onEditClick={() => setMode("Edit")}
          onDeleteClick={() => deleteTodo.mutate(id)}
        />
      )}
      {mode === "Edit" && (
        <TextInput
          isLoading={isMutating}
          title={title}
          onSubmit={(newTitle: string) =>
            updateTodo.mutate({
              ...todo,
              title: newTitle,
            })
          }
        />
      )}
    </div>
  );
};
