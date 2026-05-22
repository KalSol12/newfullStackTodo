import { useState, useCallback, useMemo } from "react";
import {
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export function useTodoDnD(todos, reorderTodos, canReorder) {
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const activeTodo = useMemo(
    () => todos.find((todo) => todo._id === activeId),
    [todos, activeId]
  );

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over || active.id === over.id || !canReorder) return;

      const oldIndex = todos.findIndex((todo) => todo._id === active.id);
      const newIndex = todos.findIndex((todo) => todo._id === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      reorderTodos(arrayMove(todos, oldIndex, newIndex));
    },
    [todos, reorderTodos, canReorder]
  );

  return {
    sensors,
    activeId,
    activeTodo,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
}
