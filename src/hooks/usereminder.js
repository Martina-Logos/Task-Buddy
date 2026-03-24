import { useEffect, useRef } from 'react'

export function useReminder(tasks) {
  const timers = useRef([])

  useEffect(() => {
    // Clear old timers
    timers.current.forEach(clearTimeout)
    timers.current = []

    // Check support + permission
    if (typeof Notification === 'undefined') return
    if (Notification.permission !== 'granted') return

    const now = Date.now()

    tasks.forEach(task => {
      if (task.completed || !task.reminderTime) return

      const reminderTime = new Date(task.reminderTime).getTime()
      const delay = reminderTime - now

      // 🔥 Handle past reminders (missed notifications)
      if (delay <= 0) {
        new Notification('⏰ Task Reminder — TaskBuddy', {
          body: task.title,
          icon: '/vite.svg',
        })
        return
      }

      // Schedule future reminder
      const id = setTimeout(() => {
        new Notification('⏰ Task Reminder — TaskBuddy', {
          body: task.title,
          icon: '/vite.svg',
        })
      }, delay)

      timers.current.push(id)
    })

    // Cleanup on re-run/unmount
    return () => {
      timers.current.forEach(clearTimeout)
    }
  }, [tasks])
}