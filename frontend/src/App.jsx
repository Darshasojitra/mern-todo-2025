import { useState } from 'react'
import './style/app.css'
import NavBar from './components/navbar'
import { Routes,Route } from 'react-router-dom'
import AddTask from './components/addTask'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar />
    <Routes>
      <Route path='/' element={<h1>Task List </h1>} />
      <Route path='/add' element={<AddTask />} />

      </Routes>
    </>
  )
}

export default App
