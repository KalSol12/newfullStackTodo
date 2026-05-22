import { memo } from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, deleteTodo, toggleComplete, startEdit, dragDisabled }) {
  if (todos.length === 0) {
    return <div className="emptyState">No tasks yet 🚀</div>;
  }

  return (
    <div className="list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          startEdit={startEdit}
          dragDisabled={dragDisabled}
        />
      ))}
    </div>
  );
}

export default memo(TodoList);
