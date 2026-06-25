# Todo List App

A modern, minimal todo list application built with Next.js and Tailwind CSS.

## Features

- **Add tasks** — Type a task and press Enter or click "Add"
- **Toggle completion** — Click the circle to mark tasks as complete/incomplete
- **Delete tasks** — Hover over a task and click the `X` to remove it
- **Live counter** — Shows how many tasks are still pending
- **Empty state** — Friendly message when no tasks exist
- **Responsive design** — Works on mobile and desktop

## How It Works

All data lives in **client-side state** (`useState`). Tasks are stored as an array of objects:

```ts
{ text: string; complete: boolean }
```

When you add, toggle, or delete a task, the state updates instantly and the UI re-renders. No server or database is involved — refreshing the page clears all tasks.

## Tech Stack

| Layer        | Technology                      |
| ------------ | ------------------------------- |
| Framework    | Next.js 16 (App Router)         |
| UI Library   | React 19                        |
| Language     | TypeScript                      |
| Styling      | Tailwind CSS v4                 |
| Fonts        | Geist (via `next/font`)         |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
