import { useState, useMemo } from "react";
import { useTodosContext } from "../../todos/TodosContext";
import CalendarView from "../components/CalendarView";
import CollapsibleSection from "../../../shared/components/CollapsibleSection";
import Tabs from "../../../shared/components/Tabs";

export default function CalendarPage() {
  const { todos } = useTodosContext();
  const [view, setView] = useState("month");

  const withDates = useMemo(
    () => todos.filter((t) => t.startDate || t.endDate).length,
    [todos]
  );

  return (
    <div className="page pageCalendar">
      <CollapsibleSection title="Calendar options" defaultOpen={false} badge={withDates}>
        <Tabs
          active={view}
          onChange={setView}
          tabs={[
            { id: "month", label: "Month" },
            { id: "week", label: "Week" },
            { id: "day", label: "Day" },
          ]}
        />
        <p className="pageHint">Tasks with dates appear on the calendar.</p>
      </CollapsibleSection>
      <CollapsibleSection title="Schedule" defaultOpen>
        <CalendarView todos={todos} view={view} onViewChange={setView} />
      </CollapsibleSection>
    </div>
  );
}
