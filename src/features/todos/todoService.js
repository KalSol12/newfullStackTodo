import { apiRequest } from "../../shared/api/client";

const BASE = "/todos";

export function fetchTodos() {
  return apiRequest(BASE);
}

export function createTodo(todo) {
  return apiRequest(BASE, {
    method: "POST",
    body: JSON.stringify(todo),
  });
}

export function updateTodo(id, updatedTodo) {
  return apiRequest(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedTodo),
  });
}

export function deleteTodo(id) {
  return apiRequest(`${BASE}/${id}`, { method: "DELETE" });
}

export function clearAllTodos() {
  return apiRequest(BASE, { method: "DELETE" });
}

export function reorderTodos(orderedIds) {
  return apiRequest(`${BASE}/reorder`, {
    method: "PUT",
    body: JSON.stringify({ orderedIds }),
  });
}
