export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodosState {
  todos: Todo[];
}

// // Entities and visibility filter approach
// export interface TodoEntity {
//   [id: number]: Todo;
// }

// export interface TodoState {
//   todos: TodoEntity;
//   visibilityFilter: "all" | "done" | "undone";
// }
