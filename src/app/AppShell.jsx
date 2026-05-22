import { TodosProvider, useTodosContext } from "../features/todos/TodosContext";
import { useTodoNotifications } from "../features/todos/hooks/useTodoNotifications";
import AppLayout from "../layouts/AppLayout";

function NotificationsBridge() {
  const { todos, setTodos } = useTodosContext();
  useTodoNotifications(todos, setTodos);
  return <AppLayout />;
}

export default function AppShell() {
  return (
    <TodosProvider>
      <NotificationsBridge />
    </TodosProvider>
  );
}
