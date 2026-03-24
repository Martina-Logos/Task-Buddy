# Prompt-Powered Kickstart: Building a Task Reminder App with React, Vite, TailwindCSS & the Web Notifications API

---

## 1. Title & Objective

**Technology chosen:** Web Notifications API (core new tech), alongside React + Vite + TailwindCSS

**Why I chose it:**  
Most beginners know how to build UIs, but browser APIs like Web Notifications feel intimidating — they involve permissions, async flows, and OS-level integration. This project demystifies that, wrapped inside a practical app people actually want to use.

**End goal:**  
A fully working Task Reminder App where users can:
- Add tasks with optional reminder times
- Receive browser notifications at the scheduled time
- See tasks persist across page refreshes (via `localStorage`)
- Interact with a clean, responsive UI styled with TailwindCSS

---

## 2. Quick Summary of the Technologies

### Web Notifications API
A browser-native API that lets web apps send desktop/mobile notifications — the same kind you see from apps like Slack or Gmail — without any backend or third-party library.

**Where it is used:** Productivity apps, messaging platforms, news alerts, e-commerce order updates.

**Real-world example:** Gmail uses it to show "New message from ..." notifications even when the tab is in the background.

Key interface:
```js
Notification.permission         // "default" | "granted" | "denied"
Notification.requestPermission() // returns Promise<"granted"|"denied">
new Notification("Title", { body: "Message", icon: "/icon.png" })
```

### React + Vite
React is the most widely used JavaScript UI library. Vite is a modern build tool that replaces Create React App — it starts in milliseconds and supports Hot Module Replacement (HMR).

### TailwindCSS
A utility-first CSS framework. Instead of writing `.card { padding: 16px; }`, you write `className="p-4"` directly in JSX. It produces small, optimized CSS bundles in production.

### localStorage
A browser key-value store that persists data between sessions — no database required.

---

## 3. System Requirements

| Requirement | Version |
|---|---|
| OS | Windows 10+, macOS 12+, or Ubuntu 20.04+ |
| Node.js | v18 or higher |
| npm | v9 or higher (bundled with Node) |
| Browser | Chrome 80+, Firefox 75+, Edge 80+ (Safari has limited Notification support) |
| Editor | VS Code (recommended) |

Check your versions:
```bash
node -v   # should print v18.x.x or higher
npm -v    # should print 9.x.x or higher
```

---

## 4. Installation & Setup Instructions

### Step 1 — Scaffold the project with Vite

```bash
npm create vite@latest todo-reminder-app -- --template react
cd todo-reminder-app
npm install
```

Expected output:
```
✔ Project created.
✔ Packages installed.
```

### Step 2 — Install TailwindCSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

This creates `tailwind.config.js` and `postcss.config.js`.

### Step 3 — Configure Tailwind content paths

Open `tailwind.config.js` and set:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
}
```

### Step 4 — Add Tailwind directives to CSS

Replace the entire contents of `src/index.css` with:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 5 — Install date-fns (optional, for time formatting)

```bash
npm install date-fns
```

### Step 6 — Run the dev server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. You should see the Vite + React default page.

---

## 5. Minimal Working Example — Web Notifications API

Before building the full app, here is the smallest possible example that proves the Notifications API works.

Create a file `src/NotificationTest.jsx`:

```jsx
import { useState } from 'react'

export default function NotificationTest() {
  const [status, setStatus] = useState(Notification.permission)

  async function sendTestNotification() {
    // Step 1: request permission if not already granted
    if (Notification.permission !== 'granted') {
      const result = await Notification.requestPermission()
      setStatus(result)
      if (result !== 'granted') return
    }

    // Step 2: fire the notification
    new Notification('Hello from your app!', {
      body: 'The Web Notifications API is working 🎉',
    })
  }

  return (
    <div>
      <p>Permission: <strong>{status}</strong></p>
      <button onClick={sendTestNotification}>
        Send Test Notification
      </button>
    </div>
  )
}
```

**Expected output:** A browser/OS notification popup appears saying "Hello from your app!"

---

## 6. AI Prompt Journal

| # | Prompt Used | AI Response Summary | Helpfulness |
|---|---|---|---|
| 1 | "Give me a step-by-step guide to initialize TailwindCSS in a React Vite app" | AI walked through `npm install`, `npx tailwindcss init -p`, configuring `content` paths, and adding `@tailwind` directives | ⭐⭐⭐⭐⭐ — exactly what I needed |
| 2 | "How does the Web Notifications API work? Show me a minimal example with permission request" | AI explained the three permission states and provided a clean async example using `Notification.requestPermission()` | ⭐⭐⭐⭐⭐ — demystified the async flow |
| 3 | "How do I schedule a browser notification at a specific future time in JavaScript?" | AI showed how to compute the delay using `Date.now()` and `setTimeout`, and warned about tab-sleep limitations in some browsers | ⭐⭐⭐⭐ — practical with good caveats |
| 4 | "How do I persist React state in localStorage and restore it on mount?" | AI explained the `useState` lazy initializer pattern and `useEffect` sync pattern | ⭐⭐⭐⭐⭐ — clean pattern I now use everywhere |
| 5 | "How do I prevent a `setTimeout` notification from firing twice in React Strict Mode?" | AI explained that Strict Mode double-invokes effects in development and showed the cleanup return pattern for `useEffect` | ⭐⭐⭐⭐ — saved me an hour of debugging |

**Learning reflections:**  
Using AI prompts accelerated the learning loop dramatically. Instead of reading entire MDN pages linearly, I could ask targeted questions and get runnable examples. The most valuable moments were when the AI proactively warned me about edge cases I hadn't thought to ask about — like Strict Mode double-firing and Safari's limited Notification support.

---

## 7. Common Issues & Fixes

### Issue 1 — Tailwind classes not applying

**Symptom:** You write `className="text-red-500"` but see no styling.  
**Cause:** The `content` array in `tailwind.config.js` doesn't include your file paths.  
**Fix:**
```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```
Restart the dev server after editing the config.

---

### Issue 2 — `Notification is not defined` in tests or SSR

**Symptom:** `ReferenceError: Notification is not defined`  
**Cause:** The Notifications API only exists in a real browser window — not in Node.js (tests/SSR).  
**Fix:** Guard with a feature-detection check before using it:
```js
if (!('Notification' in window)) {
  console.warn('Notifications not supported')
  return
}
```

---

### Issue 3 — Notification permission always shows "denied" / can't re-request

**Symptom:** `Notification.requestPermission()` returns `"denied"` immediately without prompting.  
**Cause:** The user previously dismissed or blocked the permission prompt. Browsers remember this and won't re-prompt via JS.  
**Fix:** Instruct the user to reset permissions manually:
- Chrome: Click the lock icon in the address bar → Notifications → Allow
- Firefox: Preferences → Privacy & Security → Notifications → Remove site

---

### Issue 4 — Notification fires twice in development

**Symptom:** You get two notifications per task.  
**Cause:** React Strict Mode double-invokes `useEffect` in development to catch side effects.  
**Fix:** Always return a cleanup function from `useEffect`:
```js
useEffect(() => {
  const id = setTimeout(() => { /* ... */ }, delay)
  return () => clearTimeout(id)   // ← this prevents double-firing
}, [tasks])
```

---

### Issue 5 — `localStorage` data lost between sessions (private/incognito)

**Symptom:** Tasks disappear on every page reload.  
**Cause:** Private/incognito mode disables persistent `localStorage`.  
**Fix:** This is expected browser behavior. Inform users the app requires a regular (non-private) browser window for persistence.

---

### Issue 6 — `datetime-local` input shows wrong timezone

**Symptom:** The reminder fires at the wrong time.  
**Cause:** `datetime-local` values are in local time, but `new Date(value)` interprets them correctly as local time — so this usually works. Issues arise when manually comparing ISO strings across timezones.  
**Fix:** Always construct Date objects with `new Date(reminderTimeString)` rather than manually parsing the string.

---

## 8. References

### Official Documentation
- [Web Notifications API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API)
- [TailwindCSS Installation (Vite)](https://tailwindcss.com/docs/guides/vite)
- [React Docs — useEffect](https://react.dev/reference/react/useEffect)
- [Vite Getting Started](https://vitejs.dev/guide/)
- [localStorage API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

### Helpful Articles
- [Tailwind CSS Crash Course — Traversy Media (YouTube)](https://www.youtube.com/watch?v=UBOj6rqRUME)
- [React Custom Hooks — Robin Wieruch](https://www.robinwieruch.de/react-custom-hook/)
- [Browser Notifications in 5 minutes — CSS-Tricks](https://css-tricks.com/browser-notifications-in-5-minutes/)

### Troubleshooting
- [Stack Overflow: Notification permission denied](https://stackoverflow.com/questions/34312976/notification-permission-denied-programmatically)
- [Stack Overflow: useEffect fires twice React 18](https://stackoverflow.com/questions/72238175/why-useeffect-running-twice-and-how-to-handle-it)