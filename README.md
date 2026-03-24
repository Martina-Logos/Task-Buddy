# TaskBuddy — Task Reminder App

> A productivity app built with React + Vite + TailwindCSS and the Web Notifications API.  
> Capstone project for the AI Beginner's Toolkit — Moringa School.

You type in anything you need to do — like *"Submit assignment"* or *"Call the doctor"* — set a time for it, and the app will send a notification to your browser when that time arrives, even if you're on a different tab.
You can mark tasks done, edit them, delete them, and label them as High, Medium, or Low priority. At the top, a small dashboard shows you at a glance how many tasks you've completed, how many are still pending, and how many are overdue.
Everything is saved in your browser, so your tasks are still there when you close and reopen the page — no account or internet connection needed.

---

## 🌟 Features

### Core
- ✅ Add tasks with input validation (no empty tasks allowed)
- ✅ View all tasks in a clean, organized list
- ✅ Mark tasks as completed or pending with a checkbox
- ✅ Visual distinction for completed tasks (strikethrough + fade)
- ✅ Delete tasks individually with a confirm-before-delete prompt

### Reminders
- 🔔 Set a due date and time per task
- 🔔 Browser notification fires at the scheduled reminder time
- 🔔 Overdue badge appears on tasks past their due date

### Task Management
- ✏️ Inline edit — update task title, due date, and priority without leaving the page
- 🎯 Priority levels — High, Medium, Low with color-coded left border
- 🗂️ Filter by All / Pending / Done / High / Medium / Low
- ↕️ Sort by Newest, Due Date, or Priority
- 🔍 Live search — find any task instantly by keyword

### Analytics
- 📊 Stats bar showing Total, Pending, Done, and Overdue counts at a glance

### UI / UX
- 🎨 Custom color scheme — Butter Yellow, Ocean Blue, and Orange
- 📱 Fully responsive — works on mobile, tablet, and desktop
- 💾 Tasks persist across page refreshes via `localStorage`

---

## 🛠️ Tech Stack

| Tool | Role |
|---|---|
| React 18 | UI component library |
| Vite | Dev server + build tool |
| TailwindCSS 3 | Utility-first styling |
| Web Notifications API | Browser reminder notifications |
| localStorage | Client-side data persistence |
| Google Fonts (DM Sans + Playfair Display) | Typography |

---

## 📁 Project Structure

```
todo-reminder-app/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── README.md
├── TOOLKIT.md
└── src/
    ├── main.jsx                        # React entry point
    ├── App.jsx                         # Root component — wires everything together
    ├── index.css                       # Global styles + color theme
    ├── components/
    │   ├── TaskForm.jsx                # Add task form (title + reminder + priority)
    │   ├── TaskList.jsx                # Renders the full task list
    │   ├── TaskItem.jsx                # Single task card with edit + delete
    │   ├── StatsBar.jsx                # Total / Pending / Done / Overdue stats
    │   ├── FilterBar.jsx               # Filter pills + sort dropdown
    │   ├── SearchBar.jsx               # Live keyword search
    │   └── NotificationBell.jsx        # Notification permission UI
    └── hooks/
        ├── useTasks.js                 # Task CRUD + localStorage sync
        └── useReminder.js              # Schedules Web Notifications per task
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher → [nodejs.org](https://nodejs.org)
- npm v9+ (comes bundled with Node)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/todo-reminder-app.git

# 2. Navigate into the project
cd todo-reminder-app

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build      # outputs to /dist folder
npm run preview    # preview the production build locally
```

---

## 🔔 How Notifications Work

1. Click **Enable Reminders** in the top-right corner of the app
2. Allow notifications when the browser prompts you
3. Add a task and set a reminder time a few minutes from now
4. When the time arrives, a browser notification will pop up — even if the tab is in the background

> **Note:** Notifications require a secure context (HTTPS or localhost).  
> Safari on macOS has limited support for the Web Notifications API.

---

## 🎨 Color Theme

| Color | Hex | Used for |
|---|---|---|
| Butter Yellow | `#F9E07A` | Logo, background blobs, accent highlights |
| Ocean Blue | `#0E7490` | Buttons, focus rings, links, ocean stats |
| Orange | `#F97316` | Overdue badges, medium priority, warnings |
| Warm Cream | `#FDFAF0` | App background |

---

## 📖 Toolkit Document

See [`TOOLKIT.md`](./TOOLKIT.md) for the full capstone submission document including:
- Technology overview (Web Notifications API)
- Step-by-step setup instructions
- Minimal working example
- AI Prompt Journal with reflections
- Common errors and fixes
- Reference resources

---

## 🤖 AI Tools Used

This project was built with the assistance of generative AI via [ai.moringaschool.com](https://ai.moringaschool.com).  
All AI prompts used and their responses are documented in `TOOLKIT.md`.

---

## 📝 License

MIT — free to use and modify.