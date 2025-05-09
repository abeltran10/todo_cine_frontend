import React, { useState, useEffect } from 'react'

import Header from '../component/layout/Header'
import Notification from '../component/common/Notification'
import LoginForm from '../component/user/LoginForm'

import { useNavigate } from 'react-router-dom'

import loginService from '../service/login'

const LoginFormContainer = () => {
  const title = 'TODO CINE'

  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const login = async (username, password) => {
    
    try {
      const response = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUserToken', response.headers.getAuthorization())
      window.localStorage.setItem('loggedUser', JSON.stringify(response.data))
      console.log(response.data)
      navigate('/home', {
        state: { successMessage: 'Inicio de sesión exitoso' }
      })

    } catch (exception) {
      setErrorMessage('Usuario o contraseña incorrectos')
      setTimeout(() => { setErrorMessage('') }, 5000)
    }

  }

  const crearCuenta = () => {
    navigate(`/createaccount`)
  }

  return (<div>
              <Notification successMessage={successMessage} errorMessage={errorMessage}/>
              <Header title={title} />
              <LoginForm login={login} crearCuenta={crearCuenta}/>
          </div>       
    )

}

export default LoginFormContainer