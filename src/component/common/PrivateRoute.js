import React from 'react'
import { Navigate } from 'react-router-dom'
import isTokenValid  from '../../utils/auth'

const PrivateRoute = ({ children }) => {
  return isTokenValid() ? children : <Navigate to="/app/" />
}

export default PrivateRoute
