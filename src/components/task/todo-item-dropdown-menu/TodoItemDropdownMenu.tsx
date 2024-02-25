import { ComponentProps, useId, useState } from "react";
import styles from "./TodoItemDropdownMenu.module.scss";
import clsx from "clsx";
import {
  FloatingFocusManager,
  useFloating,
  useInteractions,
  useClick,
  useDismiss,
  autoPlacement,
  useTransitionStyles,
} from "@floating-ui/react";
import { ThreeDot } from "../../ui/Icon";

interface TodoItemDropdownMenuProps extends ComponentProps<"div"> {
  todoId: number;
  onDeleteClick: (id: number) => void;
  onEditClick: (id: number) => void;
}

export const TodoItemDropdownMenu = ({
  todoId,
  onDeleteClick,
  onEditClick,
  className,
  ...rest
}: TodoItemDropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      autoPlacement({
        allowedPlacements: ["bottom-end"],
      }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const { styles: transitionStyles } = useTransitionStyles(context);

  const headingId = useId();

  return (
    <div {...rest} className={clsx(styles.dropdownMenu, className)}>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className={styles.trigger}
      >
        <ThreeDot />
      </button>
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            id={headingId}
            className={styles.popover}
            ref={refs.setFloating}
            style={{ ...floatingStyles, ...transitionStyles }}
            {...getFloatingProps()}
          >
            <ul>
              <li>
                <button
                  onClick={() => {
                    onEditClick(todoId);
                  }}
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  className={styles.danger}
                  onClick={() => {
                    onDeleteClick(todoId);
                    setIsOpen(false);
                  }}
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </FloatingFocusManager>
      )}
    </div>
  );
};
