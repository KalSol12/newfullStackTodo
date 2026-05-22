/** Pure selectors — safe to memoize with useMemo */

export function filterTodos(todos, { filter, search, categoryFilter }) {
  const query = search.trim().toLowerCase();

  return todos.filter((todo) => {
    if (filter === "active" && todo.completed) return false;
    if (filter === "completed" && !todo.completed) return false;
    if (categoryFilter !== "All" && todo.category !== categoryFilter) return false;
    if (query && !todo.text.toLowerCase().includes(query)) return false;
    return true;
  });
}

export function canReorderTodos({ filter, search, categoryFilter }) {
  return filter === "all" && !search.trim() && categoryFilter === "All";
}

/** Single-pass stats for performance */
export function computeTodoStats(todos) {
  let completed = 0;
  let active = 0;
  const byPriority = { Low: 0, Medium: 0, High: 0 };
  const byCategory = {};

  for (const todo of todos) {
    if (todo.completed) completed++;
    else active++;

    if (byPriority[todo.priority] !== undefined) {
      byPriority[todo.priority]++;
    }

    if (todo.category) {
      if (!byCategory[todo.category]) {
        byCategory[todo.category] = { total: 0, completed: 0 };
      }
      byCategory[todo.category].total++;
      if (todo.completed) byCategory[todo.category].completed++;
    }
  }

  const total = todos.length;
  const progressPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const categoryProgress = Object.entries(byCategory).map(([category, data]) => ({
    category,
    total: data.total,
    completed: data.completed,
    percentage: data.total === 0 ? 0 : Math.round((data.completed / data.total) * 100),
  }));

  return {
    total,
    completed,
    active,
    remaining: active,
    progressPercentage,
    byPriority,
    categoryProgress,
  };
}

export function getDueTodayTodos(todos) {
  const today = new Date().toISOString().split("T")[0];
  return todos.filter((todo) => todo.endDate === today && !todo.completed);
}
