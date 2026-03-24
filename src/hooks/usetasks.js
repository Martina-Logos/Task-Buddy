import { useState, useEffect } from 'react'

const KEY = 'TaskBuddy-tasks'

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const s = localStorage.getItem(KEY)
      return s ? JSON.parse(s) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(title, reminderTime, priority) {
    setTasks(prev => [{
      id: String(Date.now()),
      title: title.trim(),
      reminderTime,
      priority: priority || 'medium',
      completed: false,
      createdAt: new Date().toISOString(),
    }, ...prev])
  }

  function toggleTask(id) {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ))
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function editTask(id, updates) {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, ...updates } : t
    ))
  }

  return { tasks, addTask, toggleTask, deleteTask, editTask }
}