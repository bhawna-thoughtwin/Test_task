import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DemoTable from './pages/DemoTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DemoTable/>
    </>
  )
}

export default App
