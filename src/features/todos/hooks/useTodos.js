import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../../auth/AuthContext";
import * as todoApi from "../todoService";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const { token, isAuthenticated } = useAuth();

  const loadTodos = useCallback(async () => {
    if (!token) {
      setTodos([]);
      return;
    }
    try {
      const data = await todoApi.fetchTodos();
      setTodos(data);
    } catch (error) {
      console.error(error);
      setTodos([]);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated) loadTodos();
    else setTodos([]);
  }, [isAuthenticated, loadTodos]);

  const addTodo = useCallback(
    async (form, editId) => {
      if (!form.text.trim()) return;

      if (editId) {
        const target = todos.find((t) => t._id === editId);
        if (!target) return;
        const updated = await todoApi.updateTodo(editId, { ...target, ...form });
        setTodos((prev) => prev.map((t) => (t._id === editId ? updated : t)));
      } else {
        const saved = await todoApi.createTodo({
          ...form,
          completed: false,
        });
        setTodos((prev) => [...prev, saved]);
      }
    },
    [todos]
  );

  const deleteTodo = useCallback(async (id) => {
    await todoApi.deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  }, []);

  const toggleComplete = useCallback(
    async (id) => {
      const target = todos.find((t) => t._id === id);
      if (!target) return;
      const updated = await todoApi.updateTodo(id, {
        ...target,
        completed: !target.completed,
      });
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    },
    [todos]
  );

  const reorderTodos = useCallback(
    async (newTodos) => {
      setTodos(newTodos);
      try {
        const orderedIds = newTodos.map((t) => t._id);
        const updated = await todoApi.reorderTodos(orderedIds);
        setTodos(updated);
      } catch (error) {
        console.error(error);
        loadTodos();
      }
    },
    [loadTodos]
  );

  const clearAllTodos = useCallback(async () => {
    await todoApi.clearAllTodos();
    setTodos([]);
  }, []);

  return useMemo(
    () => ({
      todos,
      setTodos,
      addTodo,
      deleteTodo,
      toggleComplete,
      reorderTodos,
      clearAllTodos,
      refreshTodos: loadTodos,
    }),
    [todos, addTodo, deleteTodo, toggleComplete, reorderTodos, clearAllTodos, loadTodos]
  );
}
