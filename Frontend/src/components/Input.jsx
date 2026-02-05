import { useState } from 'react'

function Input({ heights, setHeights }) {
  const [text, setText] = useState(heights.join(','))
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
    setError('')
  }

  const handleSubmit = () => {
    const items = text.split(',').map(t => t.trim()).filter(Boolean)

    if (items.length === 0) {
      setError('Enter at least one value')
      return
    }

    const numbers = []
    for (const item of items) {
      const num = Number(item)
      if (isNaN(num) || num < 0) {
        setError(`"${item}" is not valid. Only positive numbers.`)
        return
      }
      numbers.push(num)
    }

    setHeights(numbers)
    setError('')
  }

  return (
    <div className="terrain-input">
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {error && <small className="error">{error}</small>}
    </div>
  )
}

export default Input
