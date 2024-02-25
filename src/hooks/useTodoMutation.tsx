import { useMutation, useQueryClient } from "react-query";
import { Todo } from "../lib/definition";
import apis from "../lib/apis";

interface Options {
  onUpdateSuccess?: () => void;
  onAddSuccess?: () => void;
}

export const useTodoMutation = (options?: Options) => {
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
        if (options?.onUpdateSuccess) {
          options.onUpdateSuccess();
        }
      },
    }
  );

  const deleteTodo = useMutation((id: number) => apis.deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const addNewTodo = useMutation((title: string) => apis.postTodo(title), {
    onSuccess: async () => {
      await queryClient.invalidateQueries("todos");
      if (options?.onAddSuccess) {
        options.onAddSuccess();
      }
    },
  });

  const isMutating = updateTodo.isLoading || deleteTodo.isLoading;

  return {
    updateTodo,
    deleteTodo,
    addNewTodo,
    isMutating,
  };
};
