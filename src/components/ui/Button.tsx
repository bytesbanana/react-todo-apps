import { ComponentProps } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps extends ComponentProps<"button"> {}

export const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button {...rest} className={clsx(styles.button, className)}>
      {children}
    </button>
  );
};
