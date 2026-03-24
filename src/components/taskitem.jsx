import { useState } from 'react'

const PRIORITY_BADGE = {
  high:   { cls: 'badge-high',   label: '🔴 High' },
  medium: { cls: 'badge-medium', label: '🟠 Medium' },
  low:    { cls: 'badge-low',    label: '🟢 Low' },
}

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing]     = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editTime, setEditTime]   = useState(task.reminderTime || '')
  const [editPrio, setEditPrio]   = useState(task.priority)
  const [confirmDel, setConfirm]  = useState(false)

  function saveEdit() {
    if (!editTitle.trim()) return
    onEdit(task.id, {
      title: editTitle.trim(),
      reminderTime: editTime,
      priority: editPrio,
    })
    setEditing(false)
  }

  function cancelEdit() {
    setEditTitle(task.title)
    setEditTime(task.reminderTime || '')
    setEditPrio(task.priority)
    setEditing(false)
  }

  const formattedTime = task.reminderTime
    ? new Date(task.reminderTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
    : null

  const isOverdue = task.reminderTime && !task.completed &&
    new Date(task.reminderTime) < new Date()

  const badge = PRIORITY_BADGE[task.priority] || PRIORITY_BADGE.medium

  const nowLocal = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString().slice(0, 16)

  return (
    <div className={`task-item ${task.priority} ${task.completed ? 'completed' : ''}`}>
      {/* Checkbox */}
      <input
        type="checkbox"
        className="task-check"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {/* Body */}
      <div className="task-body">
        {editing ? (
          <>
            <input
              className="edit-input"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') cancelEdit() }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <input
                type="datetime-local"
                value={editTime}
                min={nowLocal}
                onChange={e => setEditTime(e.target.value)}
                style={{ flex: 2, fontSize: 12, padding: '5px 8px' }}
              />
              <select
                value={editPrio}
                onChange={e => setEditPrio(e.target.value)}
                style={{ flex: 1, fontSize: 12, padding: '5px 8px' }}
              >
                <option value="high">🔴 High</option>
                <option value="medium">🟠 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <p className={`task-title ${task.completed ? 'done' : ''}`}>{task.title}</p>
            <div className="task-meta">
              <span className={`meta-badge ${badge.cls}`}>{badge.label}</span>
              {formattedTime && (
                <span className={`meta-badge badge-time ${isOverdue ? 'overdue' : ''}`}>
                  🕐 {formattedTime}{isOverdue ? ' · overdue' : ''}
                </span>
              )}
            </div>
          </>
        )}

        {/* Confirm delete row */}
        {confirmDel && (
          <div className="confirm-row">
            <span>Delete this task?</span>
            <button className="btn-confirm-del" onClick={() => onDelete(task.id)}>Yes, delete</button>
            <button className="btn-cancel-del" onClick={() => setConfirm(false)}>Cancel</button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="task-actions">
        {editing ? (
          <>
            <button className="btn-icon save" onClick={saveEdit} title="Save">✔</button>
            <button className="btn-icon" onClick={cancelEdit} title="Cancel">✕</button>
          </>
        ) : (
          <>
            <button className="btn-icon" onClick={() => setEditing(true)} title="Edit">✏️</button>
            <button className="btn-icon danger" onClick={() => setConfirm(true)} title="Delete">🗑️</button>
          </>
        )}
      </div>
    </div>
  )
}