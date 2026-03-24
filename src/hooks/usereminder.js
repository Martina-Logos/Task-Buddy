import { useEffect, useRef } from 'react'

export function useReminder(tasks) {
  const timers = useRef([])

  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []

    if (!('Notification' in window) || Notification.permission !== 'granted') return

    const now = Date.now()

    tasks.forEach(task => {
      if (task.completed || !task.reminderTime) return
      const delay = new Date(task.reminderTime).getTime() - now
      if (delay <= 0) return

      const id = setTimeout(() => {
        new Notification('⏰ Task Reminder — Taskflow', {
          body: task.title,
          icon: '/vite.svg',
        })
      }, delay)

      timers.current.push(id)
    })

    return () => timers.current.forEach(clearTimeout)
  }, [tasks])
}