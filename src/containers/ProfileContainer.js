import React, { useState, useEffect } from 'react';

import Profile from "../component/user/Profile"
import NavigationBar from '../component/layout/NavigationBar';
import Notification from '../component/common/Notification';
import Header from '../component/layout/Header';

import userService from '../service/user'

const ProfileContainer = () => {
    const title = 'PERFIL'
    
    const loggedUser = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUser)

    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [usuario, setUsuario] = useState(user)

    const updateUser = async (username, password, passConfirm) => {
        
            if (password !== passConfirm) {
              setErrorMessage('Las password no coinciden')
              setTimeout(() => { setErrorMessage(null) }, 5000)
            } else {
              try {
                const user = {...usuario, username, password}
                
                const response = await userService.updateUser(user)
                window.localStorage.setItem('loggedUser', JSON.stringify(response))
                setUsuario(response)
                
                setSuccessMessage('Usuario actualizado con exito')
                setTimeout(() => { setSuccessMessage(null) }, 5000)
              } catch (error) {
                setErrorMessage(error.response.data.message)
                setTimeout(() => { setErrorMessage(null) }, 5000)
              }
            }
    
      }
    
    
    return (
        <div>
            <NavigationBar user={usuario} setErrorMessage={setErrorMessage}/>
            <Notification successMessage={successMessage} errorMessage={errorMessage}/>
            <Header title={title} />            
            <Profile usuario={usuario} updateUser={updateUser} />
        </div>
    )
    
}
export default ProfileContainer