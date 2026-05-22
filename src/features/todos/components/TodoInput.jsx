import { CATEGORIES, PRIORITIES } from "../../../shared/constants";

function TodoInput({ form, updateField, onSubmit, onClearAll, isEditing }) {
  return (
    <div className="inputBox">
      <input
        value={form.text}
        onChange={(e) => updateField("text", e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        placeholder={isEditing ? "Update task..." : "What needs to be done?"}
        className="todoInput"
      />
      <div className="inputMeta">
        <label className="inputField">
          <span>Start</span>
          <input type="date" value={form.startDate} onChange={(e) => updateField("startDate", e.target.value)} />
        </label>
        <label className="inputField">
          <span>Due</span>
          <input type="date" value={form.endDate} onChange={(e) => updateField("endDate", e.target.value)} />
        </label>
        <label className="inputField">
          <span>Priority</span>
          <select value={form.priority} onChange={(e) => updateField("priority", e.target.value)}>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
        <label className="inputField">
          <span>Category</span>
          <select value={form.category} onChange={(e) => updateField("category", e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="inputActions">
        <button type="button" className="addBtn" onClick={onSubmit}>{isEditing ? "Save" : "Add"}</button>
        <button type="button" className="clearBtn" onClick={onClearAll}>Clear All</button>
      </div>
    </div>
  );
}

export default TodoInput;
