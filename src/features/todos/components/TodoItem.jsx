import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function TodoItem({ todo, deleteTodo, toggleComplete, startEdit, dragDisabled }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: todo._id, disabled: dragDisabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 200ms cubic-bezier(0.25, 0.8, 0.25, 1)",
    zIndex: isDragging ? 2 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`todoItem ${isDragging ? "isDragging" : ""} ${todo.completed ? "isCompleted" : ""}`}
    >
      <div className="todoLeft">
        <button
          type="button"
          className="dragHandle"
          aria-label="Drag to reorder"
          disabled={dragDisabled}
          {...attributes}
          {...listeners}
        >
          <span className="dragIcon" aria-hidden="true">⠿</span>
        </button>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo._id)}
        />
        <div className="todoContent">
          <span className="todoText">{todo.text}</span>
          <div className="dateRange">
            📅 {todo.startDate || "No start"} → {todo.endDate || "No end"}
          </div>
          <div className="todoMeta">
            <span className={`priority ${todo.priority}`}>{todo.priority}</span>
            <span className="categoryTag">{todo.category}</span>
          </div>
        </div>
      </div>
      <div className="todoActions">
        <button type="button" className="editBtn" onClick={() => startEdit(todo._id)}>✏️</button>
        <button type="button" className="deleteBtn" onClick={() => deleteTodo(todo._id)}>❌</button>
      </div>
    </div>
  );
}

export default memo(TodoItem);
