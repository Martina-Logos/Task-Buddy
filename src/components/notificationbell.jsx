import { useState, useEffect } from 'react'

export default function NotificationBell() {
  const [perm, setPerm] = useState('default')

  useEffect(() => {
    if ('Notification' in window) setPerm(Notification.permission)
  }, [])

  async function request() {
    if (!('Notification' in window)) return
    const result = await Notification.requestPermission()
    setPerm(result)
  }

  if (!('Notification' in window)) return null

  if (perm === 'granted') return (
    <button className="notif-btn granted" disabled>🔔 Reminders on</button>
  )
  if (perm === 'denied') return (
    <button className="notif-btn denied" disabled>🔕 Blocked</button>
  )
  return (
    <button className="notif-btn default" onClick={request}>🔔 Enable reminders</button>
  )
}