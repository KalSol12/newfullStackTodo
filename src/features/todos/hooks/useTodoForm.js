import { useState, useCallback } from "react";
import { DEFAULT_TODO_FORM } from "../../../shared/constants";

export function useTodoForm() {
  const [form, setForm] = useState(DEFAULT_TODO_FORM);
  const [editId, setEditId] = useState(null);

  const updateField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setForm(DEFAULT_TODO_FORM);
    setEditId(null);
  }, []);

  const loadTodoIntoForm = useCallback((todo) => {
    setForm({
      text: todo.text,
      startDate: todo.startDate || "",
      endDate: todo.endDate || "",
      priority: todo.priority || "Low",
      category: todo.category || "Work",
    });
    setEditId(todo._id);
  }, []);

  return {
    form,
    editId,
    isEditing: Boolean(editId),
    updateField,
    setForm,
    resetForm,
    loadTodoIntoForm,
    setEditId,
  };
}
