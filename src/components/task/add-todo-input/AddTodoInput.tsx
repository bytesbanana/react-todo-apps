import { useState } from "react";
import { useTodoMutation } from "../../../hooks/useTodoMutation";
import styles from "./AddTodoInput.module.scss";
import { LoadingSpinner } from "../../ui/loading-spinner/LoadingSpinner";

export const AddTodoInput = () => {
  const [title, setTitle] = useState("");
  const { addNewTodo, isMutating } = useTodoMutation({
    onAddSuccess() {
      setTitle("");
    },
  });

  return (
    <div
      className={styles.addTodoInputContainer}
      style={{ paddingRight: isMutating ? "1rem" : "0" }}
    >
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
      {isMutating && <LoadingSpinner width="24px" height="24px" />}
    </div>
  );
};
