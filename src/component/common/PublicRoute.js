import React from 'react'
import { Navigate } from 'react-router-dom'
import isTokenValid from '../../utils/auth'

const PublicRoute = ({ children }) => {
  return isTokenValid() ? <Navigate to="/app/home" /> : children
}

export default PublicRoute