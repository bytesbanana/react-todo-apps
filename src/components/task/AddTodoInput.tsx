import { useState } from "react";
import { useTodoMutation } from "../../hooks/useTodoMutation";
import styles from "./AddTodoInput.module.scss";

export const AddTodoInput = () => {
  const [title, setTitle] = useState("");
  const { addNewTodo, isMutating } = useTodoMutation({
    onAddSuccess() {
      setTitle('')
    },
  });

  return (
    <div className={styles.addTodoInputContainer}>
      <input
        type="text"
        placeholder="Add your todo... "
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isMutating}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addNewTodo.mutate(title);
          }
        }}
      />
    </div>
  );
};
