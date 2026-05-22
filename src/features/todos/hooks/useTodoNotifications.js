import { useEffect } from "react";

export function useTodoNotifications(todos, setTodos) {
  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (Notification.permission !== "granted") return;

    const today = new Date().toISOString().split("T")[0];
    let updated = false;

    const next = todos.map((todo) => {
      const due = todo.endDate || todo.dueDate;
      if (due === today && !todo.completed && !todo.notified) {
        new Notification("Reminder", { body: todo.text });
        updated = true;
        return { ...todo, notified: true };
      }
      return todo;
    });

    if (updated) setTodos(next);
  }, [todos, setTodos]);
}
