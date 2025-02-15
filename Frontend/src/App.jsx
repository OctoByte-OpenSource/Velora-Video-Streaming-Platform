import './App.css'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import DashBoard from './pages/DashBoard'
import WatchPartyPage from './pages/WatchPartyPage'
import SingleVideoPage from './pages/SingleVideoPage'

function App() {

  return (
    <div className='w-[100vw] overflow-x-hidden'>
      <Routes>
        <Route path='/' element={<DashBoard/>}></Route>
        <Route path = '/login' element={<Login/>}></Route>
        <Route path= '/register' element={<Register/>}></Route>
        <Route path='/watchPartyPage' element={<WatchPartyPage/>}></Route>
        <Route path='/singleVideoPage' element={<SingleVideoPage/>}></Route>
      </Routes>

    </div>
  )
}

export default App
