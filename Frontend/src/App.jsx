import './App.css'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import WatchPartyPage from './pages/WatchPartyPage'
import SingleVideoPage from './pages/SingleVideoPage'
import AppLayout from './AppComponents/Layout/appLayout'
import Homepage from './pages/Homepage'
import PrivateRoute from './AppComponents/Layout/PrivateRoute'
import UploadVideo from './pages/UploadVideo'

function App() {

  return (
    <div className='w-[100vw] overflow-x-hidden'>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path = '/login' element={<Login/>}></Route>
        <Route path= '/register' element={<Register/>}></Route>
        <Route path='/watchPartyPage' element={<WatchPartyPage/>}></Route>
        <Route path='/singleVideoPage' element={<SingleVideoPage/>}></Route>
        <Route path='/uploadVideo' element={<UploadVideo/>}></Route>

        {/* Protected Routes */}
        <Route path='/dashboard' element={
          <PrivateRoute>
              <AppLayout />
          </PrivateRoute>
          }></Route>

        <Route path='/singleVideoPage' element={
          <PrivateRoute>
              <SingleVideoPage/>
          </PrivateRoute>
          }></Route>

      </Routes>

    </div>
  )
}

export default App;
