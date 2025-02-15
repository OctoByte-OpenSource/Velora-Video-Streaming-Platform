/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const PrivateRoute = ({children}) => {
    console.log("Children", children)
    const isAuthenticated = true
  return (
    <div>
      {
        isAuthenticated ? children : <Navigate to='/login'/>
      }
    </div>
  )
}

export default PrivateRoute
