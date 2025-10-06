import { useState } from 'react'

function AddItem({ onAdd }) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const success = await onAdd(title)
    if (success) {
      setTitle('')
    } else {
      setError('Could not add item. Try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add a new to-do"
        autoFocus
      />
      <button type="submit">Add</button>
      {error && <span className="error">{error}</span>}
    </form>
  )
}

export default AddItem
