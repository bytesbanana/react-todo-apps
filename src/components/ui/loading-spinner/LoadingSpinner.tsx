import clsx from "clsx";
import { GgSpinner } from "../Icon";
import styles from "./LoadingSpinner.module.scss";
import { ComponentProps } from "react";

interface LoadingSpinnerProps extends ComponentProps<"svg"> {}

export const LoadingSpinner = ({ className, ...rest }: LoadingSpinnerProps) => (
  <GgSpinner className={clsx(styles.spinner, className)} {...rest} />
);
