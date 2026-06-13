
import React, { useState, useEffect } from "react";

const FILTERS = ["All", "Active", "Completed"];

const PRIORITY_COLORS = {
  Low: { bg: "#1c2a1c", text: "#3fb950", border: "#3fb950" },
  Medium: { bg: "#2a240f", text: "#f0883e", border: "#f0883e" },
  High: { bg: "#2a1010", text: "#f85149", border: "#f85149" },
};

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React useState", completed: true, priority: "High" },
    { id: 2, text: "Build a Todo App", completed: false, priority: "High" },
    { id: 3, text: "Style with CSS-in-JS", completed: false, priority: "Medium" },
    { id: 4, text: "Deploy to Vercel", completed: false, priority: "Low" },
  ]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  // Derived stats
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Filtered list
  const filtered = todos.filter(t => {
    if (filter === "Active") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  function addTodo() {
    if (!input.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text: input.trim(), completed: false, priority },
    ]);
    setInput("");
  }

  function toggleTodo(id) {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function deleteTodo(id) {
    setTodos(todos.filter(t => t.id !== id));
  }

  function startEdit(todo) {
    setEditId(todo.id);
    setEditText(todo.text);
  }

  function saveEdit(id) {
    if (!editText.trim()) return;
    setTodos(todos.map(t => t.id === id ? { ...t, text: editText.trim() } : t));
    setEditId(null);
  }

  function clearCompleted() {
    setTodos(todos.filter(t => !t.completed));
  }

  const bg = darkMode ? "#0d1117" : "#f6f8fa";
  const card = darkMode ? "#161b22" : "#ffffff";
  const card2 = darkMode ? "#1c2230" : "#f0f2f5";
  const border = darkMode ? "#30363d" : "#d0d7de";
  const text = darkMode ? "#e6edf3" : "#1f2328";
  const muted = darkMode ? "#8b949e" : "#656d76";
  const accent = "#58a6ff";

  const s = {
    app: {
      minHeight: "100vh",
      background: bg,
      color: text,
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 16px",
      transition: "all 0.2s",
    },
    header: {
      width: "100%",
      maxWidth: 540,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 6,
    },
    title: {
      fontSize: "1.7rem",
      fontWeight: 700,
      color: accent,
      letterSpacing: 1,
    },
    toggle: {
      background: card2,
      border: `1px solid ${border}`,
      borderRadius: 8,
      padding: "6px 12px",
      cursor: "pointer",
      color: muted,
      fontSize: "1rem",
    },
    subtitle: { color: muted, fontSize: "0.85rem", marginBottom: 24, maxWidth: 540, width: "100%" },
    // Progress
    progressWrap: {
      width: "100%",
      maxWidth: 540,
      background: card,
      border: `1px solid ${border}`,
      borderRadius: 14,
      padding: 18,
      marginBottom: 16,
    },
    progressRow: { display: "flex", justifyContent: "space-between", marginBottom: 10 },
    statPill: {
      background: card2,
      border: `1px solid ${border}`,
      borderRadius: 20,
      padding: "3px 12px",
      fontSize: "0.8rem",
    },
    barWrap: { background: border, borderRadius: 4, height: 6, overflow: "hidden" },
    bar: { height: "100%", background: `linear-gradient(90deg, ${accent}, #3fb950)`, borderRadius: 4, transition: "width 0.5s ease" },
    // Input
    inputCard: {
      width: "100%",
      maxWidth: 540,
      background: card,
      border: `1px solid ${border}`,
      borderRadius: 14,
      padding: 18,
      marginBottom: 14,
    },
    inputRow: { display: "flex", gap: 8, marginBottom: 10 },
    input: {
      flex: 1,
      padding: "10px 14px",
      background: card2,
      border: `1px solid ${border}`,
      borderRadius: 9,
      color: text,
      fontSize: "0.95rem",
      outline: "none",
    },
    addBtn: {
      padding: "10px 18px",
      background: accent,
      color: "#0d1117",
      border: "none",
      borderRadius: 9,
      fontWeight: 700,
      cursor: "pointer",
      fontSize: "0.95rem",
    },
    priorityRow: { display: "flex", gap: 8 },
    priorityBtn: (p) => ({
      padding: "4px 14px",
      borderRadius: 20,
      border: `1px solid ${PRIORITY_COLORS[p].border}`,
      background: priority === p ? PRIORITY_COLORS[p].bg : "transparent",
      color: PRIORITY_COLORS[p].text,
      cursor: "pointer",
      fontSize: "0.8rem",
      fontWeight: priority === p ? 700 : 400,
    }),
    // Filters
    filterRow: {
      display: "flex",
      gap: 8,
      width: "100%",
      maxWidth: 540,
      marginBottom: 12,
    },
    filterBtn: (f) => ({
      padding: "5px 16px",
      borderRadius: 20,
      border: `1px solid ${filter === f ? accent : border}`,
      background: filter === f ? accent : "transparent",
      color: filter === f ? "#0d1117" : muted,
      cursor: "pointer",
      fontSize: "0.82rem",
      fontWeight: filter === f ? 700 : 400,
    }),
    // List
    listWrap: { width: "100%", maxWidth: 540 },
    todoItem: (done) => ({
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: card,
      border: `1px solid ${border}`,
      borderRadius: 12,
      padding: "14px 16px",
      marginBottom: 10,
      opacity: done ? 0.65 : 1,
      transition: "opacity 0.2s",
    }),
    checkbox: {
      width: 20,
      height: 20,
      accentColor: accent,
      cursor: "pointer",
      flexShrink: 0,
    },
    todoText: (done) => ({
      flex: 1,
      fontSize: "0.95rem",
      textDecoration: done ? "line-through" : "none",
      color: done ? muted : text,
    }),
    editInput: {
      flex: 1,
      padding: "4px 10px",
      background: card2,
      border: `1px solid ${accent}`,
      borderRadius: 7,
      color: text,
      fontSize: "0.95rem",
      outline: "none",
    },
    priorityTag: (p) => ({
      padding: "2px 9px",
      borderRadius: 12,
      fontSize: "0.7rem",
      background: PRIORITY_COLORS[p].bg,
      color: PRIORITY_COLORS[p].text,
      border: `1px solid ${PRIORITY_COLORS[p].border}`,
      flexShrink: 0,
    }),
    iconBtn: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: muted,
      fontSize: "1rem",
      padding: "2px 5px",
      borderRadius: 5,
      flexShrink: 0,
    },
    emptyMsg: { color: muted, textAlign: "center", padding: "32px 0", fontSize: "0.95rem" },
    clearBtn: {
      background: "none",
      border: `1px solid ${border}`,
      color: muted,
      borderRadius: 9,
      padding: "6px 14px",
      cursor: "pointer",
      fontSize: "0.8rem",
      marginTop: 10,
      display: completed > 0 ? "block" : "none",
    },
    conceptBox: {
      width: "100%",
      maxWidth: 540,
      background: card,
      border: `1px solid ${border}`,
      borderRadius: 14,
      padding: 18,
      marginTop: 24,
    },
    conceptTitle: { color: accent, fontWeight: 700, marginBottom: 12, fontSize: "0.9rem", letterSpacing: 1 },
    conceptItem: {
      display: "flex",
      gap: 10,
      padding: "8px 0",
      borderBottom: `1px solid ${border}`,
      fontSize: "0.85rem",
    },
    conceptTag: {
      background: card2,
      color: accent,
      borderRadius: 6,
      padding: "1px 8px",
      fontFamily: "monospace",
      fontSize: "0.78rem",
      flexShrink: 0,
      alignSelf: "flex-start",
      marginTop: 2,
    },
  };

  return (
    <div style={s.app}>
      <div style={s.header}>
        <div style={s.title}>✅ TODO LIST</div>
        <button style={s.toggle} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
      <div style={s.subtitle}>A React app using useState, props, conditional rendering & lists</div>

      {/* Progress */}
      <div style={s.progressWrap}>
        <div style={s.progressRow}>
          <span style={{ fontSize: "0.85rem", color: muted }}>Progress — {progress}%</span>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={s.statPill}>📋 {total} Total</span>
            <span style={s.statPill}>⏳ {active} Active</span>
            <span style={s.statPill}>✅ {completed} Done</span>
          </div>
        </div>
        <div style={s.barWrap}>
          <div style={{ ...s.bar, width: `${progress}%` }} />
        </div>
      </div>

      {/* Input */}
      <div style={s.inputCard}>
        <div style={s.inputRow}>
          <input
            style={s.input}
            placeholder="Add a new task..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTodo()}
          />
          <button style={s.addBtn} onClick={addTodo}>+ Add</button>
        </div>
        <div style={s.priorityRow}>
          <span style={{ color: muted, fontSize: "0.82rem", alignSelf: "center" }}>Priority:</span>
          {["Low", "Medium", "High"].map(p => (
            <button key={p} style={s.priorityBtn(p)} onClick={() => setPriority(p)}>{p}</button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={s.filterRow}>
        {FILTERS.map(f => (
          <button key={f} style={s.filterBtn(f)} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {/* List */}
      <div style={s.listWrap}>
        {filtered.length === 0 ? (
          <p style={s.emptyMsg}>🎉 No tasks here — {filter === "Completed" ? "complete some first!" : "add one above!"}</p>
        ) : (
          filtered.map(todo => (
            <div key={todo.id} style={s.todoItem(todo.completed)}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={s.checkbox}
              />
              {editId === todo.id ? (
                <input
                  style={s.editInput}
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") saveEdit(todo.id); if (e.key === "Escape") setEditId(null); }}
                  autoFocus
                />
              ) : (
                <span style={s.todoText(todo.completed)}>{todo.text}</span>
              )}
              <span style={s.priorityTag(todo.priority)}>{todo.priority}</span>
              {editId === todo.id ? (
                <button style={{ ...s.iconBtn, color: "#3fb950" }} onClick={() => saveEdit(todo.id)}>💾</button>
              ) : (
                <button style={s.iconBtn} onClick={() => startEdit(todo)}>✏️</button>
              )}
              <button style={{ ...s.iconBtn, color: "#f85149" }} onClick={() => deleteTodo(todo.id)}>🗑</button>
            </div>
          ))
        )}
        {completed > 0 && (
          <button style={s.clearBtn} onClick={clearCompleted}>Clear {completed} completed</button>
        )}
      </div>

      {/* Concepts used */}
      <div style={s.conceptBox}>
        <div style={s.conceptTitle}>📚 REACT CONCEPTS USED IN THIS APP</div>
        {[
          ["useState", "Manages todos, input, filter, priority, editId, darkMode state"],
          ["Array.map()", "Renders the list of todo items from state array"],
          ["Conditional Rendering", "Shows edit input vs text, empty message, clear button"],
          ["Event Handlers", "onClick, onChange, onKeyDown for all interactions"],
          ["Derived State", "progress %, counts computed from todos array"],
          ["Props / Inline Styles", "Style objects passed as dynamic props based on state"],
          ["Controlled Inputs", "Input value tied to state via value + onChange"],
        ].map(([tag, desc]) => (
          <div key={tag} style={s.conceptItem}>
            <span style={s.conceptTag}>{tag}</span>
            <span style={{ color: muted }}>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
