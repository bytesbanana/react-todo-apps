import { Todo } from "./definition";
import { env } from "./env";

const baseUrl = env.VITE_API_BASE_URL;

async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${baseUrl}/todos`);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return await response.json();
}

async function putTodo(data: Partial<Todo>): Promise<Pick<Todo, "id">> {
    const response = await fetch(`${baseUrl}/todos/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update todos");
  }

  return await response.json();
}

async function deleteTodo(id: number): Promise<Pick<Todo, "id">> {
  const response = await fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to update delete");
  }

  return await response.json();
}

export default {
  getTodos,
  putTodo,
  deleteTodo,
};
