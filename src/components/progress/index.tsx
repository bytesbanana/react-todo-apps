import ProgressBar from "./ProgressBar";
import styles from "./Progress.module.scss";
import { Todo } from "../../lib/definition";
import { useQuery } from "react-query";
import { getTodos } from "../../lib/apis";

export const TodoProgress = () => {
  const { data: todos } = useQuery<Todo[]>("todos", getTodos);

  const complete = todos?.filter((todo) => todo.completed).length || 0;
  const total = todos?.length || 1;
  const progress = (complete / total) * 100;

  return (
    <div className={styles.todoProgress}>
      <h1 className={styles.title}>Progress</h1>
      <ProgressBar progress={progress} className={styles.title} />
      <div className={styles.textMuted}>{complete} completed</div>
    </div>
  );
};
