function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          className={`tab ${active === tab.id ? "tabActive" : ""}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {tab.count != null && <span className="tabCount">{tab.count}</span>}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
