import React from 'react'
import { Navigate } from 'react-router-dom'
import isTokenValid from '../../utils/auth'

const PublicRoute = ({ children }) => {
  return isTokenValid() ? <Navigate to="/home" /> : children
}

export default PublicRoute