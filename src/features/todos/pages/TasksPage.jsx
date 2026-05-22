import { useState, useCallback } from "react";
import { useTodosContext } from "../TodosContext";
import { useTodoForm } from "../hooks/useTodoForm";
import { useTodoStats } from "../hooks/useTodoStats";
import { useTodoDnD } from "../hooks/useTodoDnD";
import TodoInput from "../components/TodoInput";
import SortableTaskList from "../components/SortableTaskList";
import CollapsibleSection from "../../../shared/components/CollapsibleSection";
import Tabs from "../../../shared/components/Tabs";
import { CATEGORIES } from "../../../shared/constants";

export default function TasksPage() {
  const { todos, addTodo, deleteTodo, toggleComplete, reorderTodos, clearAllTodos } =
    useTodosContext();

  const { form, editId, isEditing, updateField, resetForm, loadTodoIntoForm } = useTodoForm();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filters = { filter, search, categoryFilter };
  const { filteredTodos, stats, dueToday, canReorder, filterTabs } = useTodoStats(todos, filters);

  const dnd = useTodoDnD(todos, reorderTodos, canReorder);
  const todoIds = filteredTodos.map((t) => t._id);

  const handleSubmit = useCallback(async () => {
    await addTodo(form, editId);
    resetForm();
  }, [addTodo, form, editId, resetForm]);

  const handleStartEdit = useCallback(
    (id) => {
      const todo = todos.find((t) => t._id === id);
      if (todo) loadTodoIntoForm(todo);
    },
    [todos, loadTodoIntoForm]
  );

  const handleClearAll = useCallback(async () => {
    await clearAllTodos();
    resetForm();
  }, [clearAllTodos, resetForm]);

  return (
    <div className="page pageTasks">
      {dueToday.length > 0 && (
        <div className="notificationBanner">
          🔔 {dueToday.length} task{dueToday.length !== 1 ? "s" : ""} due today
        </div>
      )}

      <CollapsibleSection title="Add task" defaultOpen badge={isEditing ? "Editing" : null}>
        <TodoInput
          form={form}
          updateField={updateField}
          onSubmit={handleSubmit}
          onClearAll={handleClearAll}
          isEditing={isEditing}
        />
      </CollapsibleSection>

      <CollapsibleSection title="Filters & search" defaultOpen>
        <div className="searchBox">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Tabs active={filter} onChange={setFilter} tabs={filterTabs} />
        <div className="categoryFilterBox">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Task list" defaultOpen badge={`${stats.remaining} left`}>
        <p className="dragHint">
          {canReorder ? "⠿ Drag the handle to reorder" : "Clear filters to reorder tasks"}
        </p>
        <SortableTaskList
          todos={filteredTodos}
          todoIds={todoIds}
          sensors={dnd.sensors}
          activeTodo={dnd.activeTodo}
          onDragStart={dnd.handleDragStart}
          onDragEnd={dnd.handleDragEnd}
          onDragCancel={dnd.handleDragCancel}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          startEdit={handleStartEdit}
          dragDisabled={!canReorder}
        />
      </CollapsibleSection>
    </div>
  );
}
