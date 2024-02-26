import { ComponentProps } from "react";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps extends ComponentProps<"div"> {
  progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return <progress className={styles.progress} value={progress} max={100} />;
};

export default ProgressBar;
