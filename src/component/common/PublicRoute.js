import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import isTokenValid from '../../utils/auth'

const PublicRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const valid = await isTokenValid()
      setIsValid(valid)
    }

    checkAuth()
  }, [])

  if (isValid === null) {
    return null
  }



  return isValid ? <Navigate to="/app/home" /> : children
}

export default PublicRoute