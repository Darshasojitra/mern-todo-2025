
import './style/app.css'
import NavBar from './components/navbar'
import { Routes,Route } from 'react-router-dom'
import AddTask from './components/addTask'
import List from './components/List'

function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path='/' element={<List />} />
      <Route path='/add' element={<AddTask />} />

      </Routes>
    </>
  )
}

export default App
