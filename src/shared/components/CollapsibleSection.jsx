import { useState } from "react";

function CollapsibleSection({ title, children, defaultOpen = true, badge, className = "" }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className={`collapseSection ${open ? "open" : "closed"} ${className}`}>
      <button
        type="button"
        className="collapseHeader"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="collapseTitle">{title}</span>
        {badge != null && <span className="collapseBadge">{badge}</span>}
        <span className="collapseChevron" aria-hidden="true">{open ? "▾" : "▸"}</span>
      </button>
      <div className="collapseBody">
        <div className="collapseInner">{children}</div>
      </div>
    </section>
  );
}

export default CollapsibleSection;
