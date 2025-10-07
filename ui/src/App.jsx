import { useEffect, useState } from 'react'
import List from './List'
import Form from './Form'

const API_BASE = (import.meta.env.VITE_API_HOST || '') + '/api'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    const res = await fetch(`${API_BASE}/todos`)
    const data = await res.json()
    setTodos(data)
  }

  async function addTodo(title) {
    if (!title.trim()) return false
    const res = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description: '' })
    })
    if (!res.ok) return false
    const data = await res.json()
    const updated = [...todos, data].sort((a, b) => a.title.localeCompare(b.title))
    setTodos(updated)
    return true
  }

  async function toggleComplete(todo) {
    const res = await fetch(`${API_BASE}/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed })
    })
    const updated = await res.json()
    setTodos(todos.map(t => t.id === updated.id ? updated : t).sort((a, b) => a.title.localeCompare(b.title)))
  }

  async function deleteTodo(id) {
    await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' })
    setTodos(todos.filter(t => t.id !== id).sort((a, b) => a.title.localeCompare(b.title)))
  }

  return (
    <div className="container">
      <h1>Your To-Do List</h1>
      <Form onAdd={addTodo} />
      <List todos={todos} onToggle={toggleComplete} onDelete={deleteTodo} />
    </div>
  )
}

export default App
