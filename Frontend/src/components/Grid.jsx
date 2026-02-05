import Cell from './Cell'

function calculateWater(heights) {
  const n = heights.length

  if (n === 0) return []

  const water = new Array(n).fill(0)
  const maxLeft = new Array(n).fill(0)
  const maxRight = new Array(n).fill(0)

  maxLeft[0] = heights[0]
  for (let i = 1; i < n; i++) {
    maxLeft[i] = Math.max(maxLeft[i - 1], heights[i])
  }

  maxRight[n - 1] = heights[n - 1]
  for (let i = n - 2; i >= 0; i--) {
    maxRight[i] = Math.max(maxRight[i + 1], heights[i])
  }

  for (let i = 0; i < n; i++) {
    water[i] = Math.min(maxLeft[i], maxRight[i]) - heights[i]
  }

  return water
}

function Grid({ heights }) {
  const maxHeight = Math.max(...heights)
  const water = calculateWater(heights)
  const total = water.reduce((sum, val) => sum + val, 0)

  const rows = []
  for (let row = maxHeight; row >= 1; row--) {
    const cells = []
    for (let col = 0; col < heights.length; col++) {
      const groundHeight = heights[col]
      const waterHeight = water[col]

      let type = 'empty'
      if (row <= groundHeight) {
        type = 'ground'
      } else if (row <= groundHeight + waterHeight) {
        type = 'water'
      }

      cells.push(<Cell key={`${row}-${col}`} type={type} />)
    }
    rows.push(
      <div key={row} className="grid-row">
        {cells}
      </div>
    )
  }

  return (
    <div className="terrain-container">
      <h3>Resultado: {total}</h3>
      <div className="terrain-grid">
        {rows}
      </div>
    </div>
  )
}

export default Grid
