import { useState } from 'react'

export default function TaskForm({ onAdd }) {
  const [title, setTitle]             = useState('')
  const [reminderTime, setReminder]   = useState('')
  const [priority, setPriority]       = useState('medium')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title, reminderTime, priority)
    setTitle('')
    setReminder('')
    setPriority('medium')
  }

  const nowLocal = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString().slice(0, 16)

  return (
    <form onSubmit={handleSubmit} className="card task-form">
      {/* Title input */}
      <div className="form-row">
        <input
          type="text"
          placeholder="What do you need to do?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Reminder + Priority */}
      <div className="form-row-3">
        <input
          type="datetime-local"
          value={reminderTime}
          min={nowLocal}
          onChange={e => setReminder(e.target.value)}
          style={{ gridColumn: 'span 2' }}
        />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="high">🔴 High</option>
          <option value="medium">🟠 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
      </div>

      <button type="submit" className="btn-add">+ Add Task</button>
    </form>
  )
}