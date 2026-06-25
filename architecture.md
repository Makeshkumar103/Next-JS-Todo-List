# Architecture

## Directory Structure

```
todo-list/
├── app/
│   ├── globals.css          # Tailwind CSS imports
│   ├── layout.tsx           # Root layout (HTML shell, fonts, metadata)
│   ├── page.tsx             # Main page — all UI and logic lives here
│   └── favicon.ico
├── public/                  # Static assets (icons)
├── .next/                   # Next.js build output (generated)
├── node_modules/            # Dependencies (generated)
├── package.json             # Project metadata & scripts
├── next.config.ts           # Next.js configuration (Turbopack)
├── tsconfig.json            # TypeScript configuration
├── postcss.config.mjs       # PostCSS config (Tailwind)
└── eslint.config.mjs        # ESLint config
```

## Component Tree

```
<html>                          (layout.tsx)
└── <body>
    └── <Home>                  (page.tsx — client component)
        ├── Header             "Todo List"
        ├── Counter            "N tasks remaining"
        ├── Input + Add btn    Add new task
        ├── Empty state        "No tasks yet" (when list is empty)
        └── Task list
            └── Task item × N
                ├── Circle btn        Toggle complete
                ├── Task text         With strikethrough when done
                └── Delete btn (X)    Remove task (visible on hover)
```

## Data Flow

```
User types in input
        │
        ▼
setInput(value)          ← controlled input
        │
   [Enter / Add click]
        │
        ▼
addTask()
  → setTasks([...tasks, { text, complete: false }])
  → setInput('')
        │
        ▼
UI re-renders with new task

---

User clicks circle on task[i]
        │
        ▼
toggleTask(i)
  → setTasks(tasks.map(t => i === index ? { ...t, complete: !t.complete } : t))
        │
        ▼
UI toggles strikethrough + green check

---

User clicks X on task[i]
        │
        ▼
removeTask(i)
  → setTasks(tasks.filter((_, idx) => idx !== i))
        │
        ▼
Task removed from list
```

## State Shape

```ts
interface Task {
  text: string;
  complete: boolean;
}

// Managed in <Home> via useState<Task[]>
const [tasks, setTasks] = useState<Task[]>([]);
```

## Key Design Decisions

- **Single client component** — Everything lives in `app/page.tsx` with `'use client'`. No server/client boundary splitting is needed for this scope.
- **No external state library** — `useState` is sufficient for a single-page todo list.
- **No persistence** — Tasks exist only in memory and are lost on refresh. A backend or `localStorage` could be added.
- **Tailwind CSS v4** — Uses the new `@import "tailwindcss"` syntax. No custom CSS required.
- **Next.js 16 Turbopack** — Configured as the bundler for fast development iteration.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start dev server         |
| `npm run build`   | Production build         |
| `npm run start`   | Serve production build   |
| `npm run lint`    | Run ESLint               |
