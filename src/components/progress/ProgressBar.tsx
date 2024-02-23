import { ComponentProps } from "react";
import styles from "./ProgressBar.module.scss";
import clsx from "clsx";

interface ProgressBarProps extends ComponentProps<"div"> {
  progress: number;
}

const ProgressBar = ({ progress, className }: ProgressBarProps) => {
  return (
    <div className={clsx(className, styles.progress)}>
      <div style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
