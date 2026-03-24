import { useMemo } from 'react'

export default function StatsBar({ tasks }) {
  const stats = useMemo(() => {
    const total     = tasks.length
    const completed = tasks.filter(t => t.completed).length
    const overdue   = tasks.filter(t =>
      !t.completed && t.reminderTime && new Date(t.reminderTime) < new Date()
    ).length
    const pending   = tasks.filter(t => !t.completed).length
    return { total, completed, overdue, pending }
  }, [tasks])

  return (
    <div className="stats-bar">
      <div className="stat-chip">
        <div className="stat-num">{stats.total}</div>
        <div className="stat-label">Total</div>
      </div>
      <div className="stat-chip">
        <div className="stat-num ocean">{stats.pending}</div>
        <div className="stat-label">Pending</div>
      </div>
      <div className="stat-chip">
        <div className="stat-num butter">{stats.completed}</div>
        <div className="stat-label">Done</div>
      </div>
      <div className="stat-chip">
        <div className="stat-num orange">{stats.overdue}</div>
        <div className="stat-label">Overdue</div>
      </div>
    </div>
  )
}