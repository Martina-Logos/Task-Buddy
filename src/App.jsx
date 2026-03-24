import { useState, useMemo } from 'react'
import { useTasks }        from './hooks/useTasks'
import { useReminder }     from './hooks/useReminder'
import TaskForm            from './components/TaskForm'
import TaskList            from './components/TaskList'
import NotificationBell    from './components/NotificationBell'
import StatsBar            from './components/StatsBar'
import FilterBar           from './components/FilterBar'
import SearchBar           from './components/SearchBar'

export default function App() {
  const { tasks, addTask, toggleTask, deleteTask, editTask } = useTasks()
  useReminder(tasks)

  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [search, setSearch] = useState('')

  const priorityOrder = { high: 0, medium: 1, low: 2 }

  const filtered = useMemo(() => {
    let result = [...tasks]

    if (search.trim())
      result = result.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
      )

    if (filter === 'pending')   result = result.filter(t => !t.completed)
    if (filter === 'completed') result = result.filter(t =>  t.completed)
    if (['high','medium','low'].includes(filter))
      result = result.filter(t => t.priority === filter)

    if (sortBy === 'dueDate')
      result.sort((a, b) => {
        if (!a.reminderTime) return 1
        if (!b.reminderTime) return -1
        return new Date(a.reminderTime) - new Date(b.reminderTime)
      })
    else if (sortBy === 'priority')
      result.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    else
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return result
  }, [tasks, filter, sortBy, search])

  return (
    <div className="app-shell">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="container">
        <header className="header">
          <div className="header-left">
            <div className="logo-mark">✦</div>
            <div>
              <h1 className="app-title">TaskBuddy</h1>
              <p className="app-sub">Focus. Act. Complete</p>
            </div>
          </div>
          <NotificationBell />
        </header>

        <StatsBar tasks={tasks} />
        <TaskForm onAdd={addTask} />
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          filter={filter} setFilter={setFilter}
          sortBy={sortBy} setSortBy={setSortBy}
          count={filtered.length}
        />
        <TaskList
          tasks={filtered}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </div>
    </div>
  )
}