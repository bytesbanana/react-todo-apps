import { TodoProgress } from "./components/progress";
import { TodoTasks } from "./components/task";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.layout}>
      <div className={styles.todoCard}>
        <TodoProgress />
        <TodoTasks />
      </div>
    </div>
  );
}

export default App;
