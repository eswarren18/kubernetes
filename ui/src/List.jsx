import { useState } from 'react'

function List({ todos, onToggle, onDelete }) {
  const [hovered, setHovered] = useState(null)

  return (
    <ul className="todos">
      {todos.map(todo => (
        <li
          key={todo.id}
          className={todo.completed ? 'completed' : ''}
          onMouseEnter={() => setHovered(todo.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo)}
            />
            <span>{todo.title}</span>
          </label>
          <button
            className="delete"
            style={{ visibility: hovered === todo.id ? 'visible' : 'hidden' }}
            title="Delete"
            onClick={() => onDelete(todo.id)}
          >
            <span role="img" aria-label="delete">🗑️</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default List
