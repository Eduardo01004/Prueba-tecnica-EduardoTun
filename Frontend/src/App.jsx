import { useState } from 'react'
import Input from './components/Input'
import Grid from './components/Grid'
import './App.css'

function App() {
  const [heights, setHeights] = useState([0,1,0,2,1,0,1,3,2,1,2,1])

  return (
    <div className="App">
      <h1>Prueba Técnica</h1>
      <Input heights={heights} setHeights={setHeights} />
      <Grid heights={heights} />
    </div>
  )
}

export default App
