import React, { useState, useEffect } from 'react'

import LoginForm from './component/LoginForm'

import loginService from './service/login'

const App = () => {
  const [user, setUser] = useState(null)

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      //blogService.setToken(user.token)
      setUser(user)
      //window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    } catch (exception) {
      //setNotification('Wrong credentials')
      //setTimeout(() => { setNotification(null) }, 5000)
    }

  }

  return (
    <div>
      <h1 className='text-info text-center'>MOVIE DATABASE</h1>
      <LoginForm login={login} />
    </div>
  );
}

export default App;
