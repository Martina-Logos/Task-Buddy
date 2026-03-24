export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrap">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange('')}>✕</button>
      )}
    </div>
  )
}