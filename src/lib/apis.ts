import { Todo } from "./definition";
import { env } from "./env";

const baseUrl = env.VITE_API_BASE_URL;

export async function getTodos() {
  const response = await fetch(`${baseUrl}/todos`);
  return await response.json();
}

export async function putTodo(data: Partial<Todo>) {
  const response = await fetch(`${baseUrl}/todos/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export async function deleteTodo(id: number) {
  const response = await fetch(`${baseUrl}/todos/${id}`, {
    method: "DELETE",
  });

  return await response.json();
}
