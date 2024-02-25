import { TodoList } from "./TodoList";
import styles from "./Task.module.scss";
import { VisibilityFilter, useTaskStore } from "../../store/useTaskStore";

export const TodoTasks = () => {
  const { setVisibilityFilter } = useTaskStore();

  return (
    <div>
      <section className={styles.header}>
        <h1>Tasks</h1>
        <select
          className={styles.select}
          onChange={(e) => {
            setVisibilityFilter(e.target.value as VisibilityFilter);
          }}
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="undone">Undone</option>
        </select>
      </section>
      <TodoList />
    </div>
  );
};
