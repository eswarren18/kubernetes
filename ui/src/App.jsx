import React, { useEffect, useState } from 'react'

const API_BASE = '/api'

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  async function fetchTodos() {
    const res = await fetch(`${API_BASE}/todos`)
    const data = await res.json()
    setTodos(data)
  }

  async function addTodo(e) {
    e.preventDefault()
    if (!title.trim()) return
    const res = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description: '' })
    })
    const data = await res.json()
    setTodos([data, ...todos])
    setTitle('')
  }

  async function toggleComplete(todo) {
    const res = await fetch(`${API_BASE}/todos/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed })
    })
    const updated = await res.json()
    setTodos(todos.map(t => t.id === updated.id ? updated : t))
  }

  async function deleteTodo(id) {
    await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' })
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <div className="container">
      <h1>Your To-Do List</h1>
      <form onSubmit={addTodo} className="add-form">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Add a new to-do" />
        <button type="submit">Add</button>
      </form>

      <ul className="todos">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <label>
              <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo)} />
              <span>{todo.title}</span>
            </label>
            <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
