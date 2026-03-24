const FILTERS = [
  { key: 'all',       label: 'All' },
  { key: 'pending',   label: 'Pending' },
  { key: 'completed', label: 'Done' },
  { key: 'high',      label: '🔴 High' },
  { key: 'medium',    label: '🟠 Medium' },
  { key: 'low',       label: '🟢 Low' },
]

export default function FilterBar({ filter, setFilter, sortBy, setSortBy, count }) {
  return (
    <div className="filter-bar">
      <div className="filter-pills">
        {FILTERS.map(f => (
          <button
            key={f.key}
            className={`pill ${f.key} ${filter === f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="count-label">{count} task{count !== 1 ? 's' : ''}</span>
        <select
          className="sort-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="newest">Newest first</option>
          <option value="dueDate">By due date</option>
          <option value="priority">By priority</option>
        </select>
      </div>
    </div>
  )
}