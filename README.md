# 📋 Task Reminder App

A beginner-friendly todo app with browser notifications, built with **React + Vite + TailwindCSS** and the **Web Notifications API**.

## ✨ Features

- ✅ Add tasks with optional reminder date/time
- 🔔 Browser notifications fire at the scheduled time
- 💾 Tasks persist across page refreshes (via `localStorage`)
- 🗑️ Delete tasks / mark them complete
- 📱 Responsive UI styled with TailwindCSS

## 🛠️ Tech Stack

| Tool | Role |
|---|---|
| React 18 + Vite | UI framework + dev server |
| TailwindCSS 3 | Utility-first styling |
| Web Notifications API | Browser reminder notifications |
| localStorage | Client-side persistence (no backend) |

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher — [download here](https://nodejs.org)
- npm v9+ (comes with Node)

### Installation

```bash
# 1. Clone the repo (or unzip the submission)
git clone https://github.com/YOUR_USERNAME/todo-reminder-app.git
cd todo-reminder-app

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

## 📁 Project Structure

```
src/
├── components/
│   ├── TaskForm.jsx          # Add task + reminder time picker
│   ├── TaskList.jsx          # Renders pending & completed tasks
│   ├── TaskItem.jsx          # Single task card
│   └── NotificationBell.jsx  # Notification permission UI
├── hooks/
│   ├── useTasks.js           # Task CRUD + localStorage sync
│   └── useReminder.js        # Schedules Web Notifications
├── App.jsx                   # Root component
├── main.jsx                  # React entry point
└── index.css                 # Tailwind directives
```

## 🔔 How Notifications Work

1. Click **Enable Reminders** in the top-right corner
2. Allow notifications when the browser prompts you
3. Add a task and set a future reminder time
4. When the time arrives, a browser notification will appear — even if the tab is in the background

> **Note:** Notifications require a secure context (HTTPS or localhost). Safari on macOS has limited support.

## 📖 Toolkit Document

See [`TOOLKIT.md`](./TOOLKIT.md) for the full beginner's guide including:
- Technology overview
- Step-by-step setup instructions
- AI Prompt Journal
- Common errors & fixes
- Reference resources

## 📝 License

MIT