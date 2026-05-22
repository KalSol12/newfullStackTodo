import { useState, useMemo } from "react";
import { useTodosContext } from "../../todos/TodosContext";
import { computeTodoStats } from "../../todos/utils/todoSelectors";
import { PRIORITIES } from "../../../shared/constants";
import ProgressPanel from "../components/ProgressPanel";
import CollapsibleSection from "../../../shared/components/CollapsibleSection";
import Tabs from "../../../shared/components/Tabs";

export default function StatsPage() {
  const { todos } = useTodosContext();
  const [tab, setTab] = useState("overview");
  const stats = useMemo(() => computeTodoStats(todos), [todos]);

  const priorityStats = useMemo(
    () => PRIORITIES.map((p) => ({ priority: p, count: stats.byPriority[p] || 0 })),
    [stats.byPriority]
  );

  return (
    <div className="page pageStats">
      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { id: "overview", label: "Overview" },
          { id: "categories", label: "Categories" },
          { id: "priority", label: "Priority" },
        ]}
      />

      {tab === "overview" && (
        <CollapsibleSection title="Overall progress" defaultOpen>
          <ProgressPanel progressPercentage={stats.progressPercentage} categoryProgress={[]} />
          <div className="statCards">
            <div className="statCard">
              <span className="statValue">{stats.total}</span>
              <span className="statLabel">Total</span>
            </div>
            <div className="statCard">
              <span className="statValue">{stats.remaining}</span>
              <span className="statLabel">Remaining</span>
            </div>
            <div className="statCard">
              <span className="statValue">{stats.completed}</span>
              <span className="statLabel">Done</span>
            </div>
          </div>
        </CollapsibleSection>
      )}

      {tab === "categories" && (
        <CollapsibleSection title="By category" defaultOpen>
          <ProgressPanel
            progressPercentage={stats.progressPercentage}
            categoryProgress={stats.categoryProgress}
          />
          {stats.categoryProgress.length === 0 && (
            <p className="pageHint">No categorized tasks yet.</p>
          )}
        </CollapsibleSection>
      )}

      {tab === "priority" && (
        <CollapsibleSection title="By priority" defaultOpen>
          <ul className="priorityStatsList">
            {priorityStats.map((item) => (
              <li key={item.priority} className="priorityStatRow">
                <span className={`priority ${item.priority}`}>{item.priority}</span>
                <span className="priorityStatCount">{item.count} tasks</span>
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      )}
    </div>
  );
}
