import { memo } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import TodoList from "./TodoList";

function SortableTaskList({
  todos,
  todoIds,
  sensors,
  activeTodo,
  onDragStart,
  onDragEnd,
  onDragCancel,
  deleteTodo,
  toggleComplete,
  startEdit,
  dragDisabled,
}) {
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <SortableContext items={todoIds} strategy={verticalListSortingStrategy}>
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
          startEdit={startEdit}
          dragDisabled={dragDisabled}
        />
      </SortableContext>
      <DragOverlay dropAnimation={{ duration: 200, easing: "ease" }}>
        {activeTodo ? (
          <div className="todoItem dragOverlay">
            <div className="todoLeft">
              <span className="dragHandle dragIcon">⠿</span>
              <span className="todoText">{activeTodo.text}</span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export default memo(SortableTaskList);
