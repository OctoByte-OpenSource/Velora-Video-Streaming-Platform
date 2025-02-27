/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const PrivateRoute = ({children}) => {
    console.log("Children", children)
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log("isAuth", isAuthenticated)
  return (
    <div>
      {
        isAuthenticated ? children : <Navigate to='/login'/>
      }
    </div>
  )
}

export default PrivateRoute
