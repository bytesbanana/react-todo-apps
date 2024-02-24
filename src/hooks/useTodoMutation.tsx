import { useMutation, useQueryClient } from "react-query";
import { Todo } from "../lib/definition";
import apis from "../lib/apis";

export const useTodoMutation = ({
  onUpdateSuccess,
}: {
  onUpdateSuccess: () => void;
}) => {
  const queryClient = useQueryClient();

  const updateTodo = useMutation(
    ({ id, title, completed }: Todo) =>
      apis.putTodo({
        id,
        title,
        completed,
      }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("todos");
        onUpdateSuccess();
      },
    }
  );

  const deleteTodo = useMutation((id: number) => apis.deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const isMutating = updateTodo.isLoading || deleteTodo.isLoading;

  return {
    updateTodo,
    deleteTodo,
    isMutating,
  };
};
