
import './style/app.css'
import NavBar from './components/navbar'
import { Routes,Route } from 'react-router-dom'
import AddTask from './components/AddTask'
import List from './components/List'
import UpdateTask from './components/UpdateTask'

function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path='/' element={<List />} />
      <Route path='/add' element={<AddTask />} />
      <Route path='/update/:id' element={<UpdateTask />} />


      </Routes>
    </>
  )
}

export default App
