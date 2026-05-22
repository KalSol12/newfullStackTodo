import { useMemo } from "react";
import { computeTodoStats, filterTodos, canReorderTodos, getDueTodayTodos } from "../utils/todoSelectors";

export function useTodoStats(todos, filters) {
  const filteredTodos = useMemo(
    () => filterTodos(todos, filters),
    [todos, filters.filter, filters.search, filters.categoryFilter]
  );

  const stats = useMemo(() => computeTodoStats(todos), [todos]);
  const dueToday = useMemo(() => getDueTodayTodos(todos), [todos]);
  const canReorder = useMemo(() => canReorderTodos(filters), [filters]);

  const filterTabs = useMemo(
    () => [
      { id: "all", label: "All", count: stats.total },
      { id: "active", label: "Active", count: stats.active },
      { id: "completed", label: "Done", count: stats.completed },
    ],
    [stats.total, stats.active, stats.completed]
  );

  return { filteredTodos, stats, dueToday, canReorder, filterTabs };
}
