import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import LoginForm from './component/LoginForm'
import Notification from './component/Notification'
import SearchForm from './component/SearchForm'
import Movie from './component/Movie'


import loginService from './service/login'
import movieService from './service/movie'
import userService from './service/user'

const App = () => {
  const [ user, setUser ] = useState(null)
  const [ movie, setMovie ] = useState(null)
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  
  useEffect(() => {
    const loggedMovieToken = window.localStorage.getItem('movieToken')
    if (loggedMovieToken) {
        userService.setToken(loggedMovieToken)
        const loggedUserMovie = window.localStorage.getItem('loggedUserMovie')
        
        const response = userService.getByName(JSON.parse(loggedUserMovie).username)
        response.then(response => {
          if (response instanceof Error) {
            setErrorMessage('Credentials out of date')
            setTimeout(() => { setErrorMessage(null) }, 5000)
          } else {
            setUser(response)
          }
        })
        
    }
  }, [])


  const login = async (username, password) => {
    try {
      const headers = await loginService.login({ username, password })
      const token = headers.getAuthorization()
      
      window.localStorage.setItem('movieToken', token)
      userService.setToken(token)

      const response = userService.getByName(username)

      response.then(response => {
        if (response instanceof Error) {
          setErrorMessage('Credentials out of date')
          setTimeout(() => { setErrorMessage(null) }, 5000)
        } else {
          setUser(response)
          window.localStorage.setItem('loggedUserMovie', JSON.stringify(response))

        }
      })
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }

  }

  const search = async (mov) => {
    try {

      console.log(mov)
      movieService.setToken(window.localStorage.getItem('movieToken'))
      
      const peli = await movieService.getByName(mov)
      setMovie(peli)
    
    }
     catch (exception) {
      setErrorMessage('Error in search')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }   
  }

  return (
    <div>
      <h1 className='text-info text-center'>MOVIE DATABASE</h1>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      { (user === null) ?
          <LoginForm login={login} /> :
         <div>
           <SearchForm search={search} />
              <Container className='p-3 mb-2' fluid="md">
                {(movie !== null) ? movie.results.map( m => <Movie movie={m} />) : <></>}
              </Container>
         </div>
      }
    </div>
  );
}

export default App;
