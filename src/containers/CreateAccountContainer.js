import React, { useState, useEffect } from 'react';

import CreateAccountForm from "../component/user/CreateAccountForm"


import userService from '../service/user'
import Header from '../component/layout/Header';
import Notification from '../component/common/Notification';

const CreateAccountContainer = () => {
    const title = 'CREAR CUENTA'

    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    
    const createUser = async (username, password) => {
        try {
          await userService.createUser({ username, password })
                    
          setSuccessMessage('Cuenta creada con exito')
          setTimeout(() => { setSuccessMessage(null) }, 5000)
        } catch (error) {
          setErrorMessage(error.response.data.message)
          setTimeout(() => { setErrorMessage(null) }, 5000)
        }
      }   
    
    return (
        <div>
            <Notification successMessage={successMessage} errorMessage={errorMessage}/>
            <Header title={title} />  
            <CreateAccountForm createUser={createUser} />
        </div>
    )

}

export default CreateAccountContainer