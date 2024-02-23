import { create } from "zustand";

export type VisibilityFilter = "all" | "done" | "undone";

type TaskStore = {
  visibilityFilter: VisibilityFilter;
  setVisibilityFilter: (filter: VisibilityFilter) => void;
};

export const useTaskStore = create<TaskStore>()((set) => ({
  visibilityFilter: "all",
  setVisibilityFilter: (filter: VisibilityFilter) =>
    set(() => ({ visibilityFilter: filter })),
}));
