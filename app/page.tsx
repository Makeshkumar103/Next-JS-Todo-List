'use client'

import { useState } from "react";

interface Task {
  text: string;
  complete: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input.trim(), complete: false }]);
      setInput('');
    }
  };

  const toggleTask = (index: number) => {
    setTasks(tasks.map((t, i) =>
      i === index ? { ...t, complete: !t.complete } : t
    ));
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const remaining = tasks.filter(t => !t.complete).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex items-start justify-center p-4">
      <div className="w-full max-w-lg mt-16">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/30 border border-white/15 p-8">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
            Todo List
          </h1>
          <p className="text-slate-400 text-sm mb-6">
            {remaining} task{remaining !== 1 ? 's' : ''} remaining
          </p>

          <div className="flex gap-3 mb-8">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
            />
            <button
              onClick={addTask}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-medium rounded-xl transition-colors duration-150 shadow-lg shadow-indigo-600/25"
            >
              Add
            </button>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No tasks yet</p>
              <p className="text-slate-600 text-sm mt-1">Add one above to get started</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    task.complete
                      ? 'bg-white/5 border border-white/5'
                      : 'bg-white/10 border border-white/10 hover:bg-white/15'
                  }`}
                >
                  <button
                    onClick={() => toggleTask(index)}
                    className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      task.complete
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-slate-500 hover:border-indigo-400'
                    }`}
                  >
                    {task.complete && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>

                  <span
                    className={`flex-1 text-sm transition-all duration-200 ${
                      task.complete
                        ? 'line-through text-slate-500'
                        : 'text-white'
                    }`}
                  >
                    {task.text}
                  </span>

                  <button
                    onClick={() => removeTask(index)}
                    className="shrink-0 opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
