import { ComponentProps, useEffect, useRef, useState } from "react";
import styles from "./TodoItem.module.scss";
import clsx from "clsx";
import { useTodoMutation } from "../../hooks/useTodoMutation";
import { Todo } from "../../lib/definition";
import { Button } from "../ui/Button";
import { TodoItemDropdownMenu } from "./TodoItemDropdownMenu";
import { LoadingSpinner } from "../ui/LoadingSpiner";

type InputMode = "Default" | "Edit";

interface TextInputProps {
  title: string;
  isLoading: boolean;
  onSubmit: (newTitle: string) => void;
  onCancel: () => void;
}

const TextInput = ({
  title,
  isLoading,
  onSubmit,
  onCancel,
}: TextInputProps) => {
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <div className={styles.todoItemTextInput}>
      {isLoading && <LoadingSpinner />}
      <input
        ref={inputRef}
        type="text"
        className={styles.textInput}
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        disabled={isLoading}
        onKeyDown={(e) => {
          switch (e.key) {
            case "Enter":
              onSubmit(newTitle);
              break;
            case "Escape":
              onCancel();
              break;
            default:
              break;
          }
        }}
      />
      <Button disabled={isLoading} onClick={() => onSubmit(newTitle)}>
        Save
      </Button>
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
        className={clsx(
          styles.todoItemCheckbox,
          isLoading && styles.textMuted,
          completed && styles.textCompleted
        )}
      >
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <input
            type="checkbox"
            id={`${id}-completed`}
            name={`${id}-completed`}
            checked={!!completed}
            onChange={onToggleCheckbox}
          />
        )}
        {title}
      </div>
      <TodoItemDropdownMenu
        todoId={id}
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
      />
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
          onCancel={() => {
            setMode("Default");
          }}
        />
      )}
    </div>
  );
};
