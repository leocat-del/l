export default function Tabs({ tabs, activeId, onChange }) {
  return (
    <nav className="tabs" role="tablist" aria-label="Разделы архива">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          id={`tab-${tab.id}`}
          aria-selected={tab.id === activeId}
          aria-controls={`panel-${tab.id}`}
          className="tab"
          onClick={() => onChange(tab.id)}
        >
          <span className="tab-number">{tab.number}</span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
