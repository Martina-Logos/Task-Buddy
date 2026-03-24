import { useState, useEffect } from 'react'

export default function NotificationBell() {
  // Explicitly define allowed values
  const [perm, setPerm] = useState('default') // 'default' | 'granted' | 'denied'

  // Check current permission on mount
  useEffect(() => {
    if (typeof Notification !== 'undefined') {
      setPerm(Notification.permission)
    }
  }, [])

  // Request permission on user click
  async function requestPermission() {
    try {
      if (typeof Notification === 'undefined') return

      const result = await Notification.requestPermission()
      setPerm(result)
    } catch (err) {
      console.error('Notification permission error:', err)
    }
  }

  // If browser doesn't support notifications
  if (typeof Notification === 'undefined') return null

  // UI states
  if (perm === 'granted') {
    return (
      <button className="notif-btn granted" disabled>
        🔔 Reminders On
      </button>
    )
  }

  if (perm === 'denied') {
    return (
      <button className="notif-btn denied" disabled>
        🔕 Notifications Blocked
      </button>
    )
  }

  return (
    <button className="notif-btn default" onClick={requestPermission}>
      🔔 Enable Reminders
    </button>
  )
}