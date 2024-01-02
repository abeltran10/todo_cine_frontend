import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup'
import Card  from 'react-bootstrap/Card'

import LoginForm from './component/LoginForm'
import Notification from './component/Notification'
import SearchForm from './component/SearchForm'
import Movie from './component/Movie'
import Footer from './component/Footer'
import NavigationBar from './component/NavigationBar'


import loginService from './service/login'
import movieService from './service/movie'
import userService from './service/user'



const App = () => {
  const [ user, setUser ] = useState(null)
  const [ movie, setMovie ] = useState(null)
  const [ textSearch, setTextSearch ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    const loggedUserMovie = window.localStorage.getItem('loggedUserMovie')

    if (loggedUserMovie) {
      const user = JSON.parse(loggedUserMovie)
      
      const response = userService.getByName(user.username)
      response.then(response => {
        if (!(response instanceof Error)) {
          setUser(response)
          window.localStorage.setItem('loggedUserMovie', JSON.stringify(response))
        }

      }) 
    }
 }, []) 

  const login = async (username, password) => {
    try {
      const headers = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUserToken', headers.getAuthorization())
     
      const response = userService.getByName(username)

      response.then(response => {
        if (response instanceof Error) {
          setErrorMessage('No se ha podido iniciar sesión')
          setTimeout(() => { setErrorMessage(null) }, 5000)
        } else {
          setUser(response)
          window.localStorage.setItem('loggedUserMovie', JSON.stringify(response))

        }
      })
    } catch (exception) {
      setErrorMessage('Usuario o contraseña no validos')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }

  }

  const logout = async () => {
    try {
      await loginService.logout()

      window.localStorage.removeItem('loggedUserToken')
      window.localStorage.removeItem('loggedUserMovie')

      setUser(null)
    } catch(exception) {
      setErrorMessage('Error al abandonar la sesión')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
    
  }

  const search = async (text, page) => {
    try {
      const pelis = await movieService.getByName(text, page)
      setMovie(pelis)
      setTextSearch(text)
    }
     catch (exception) {
      setErrorMessage('Error en la busqueda')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }   
  }

  const showGridMovies = (movie) => {
    const row = []
    if (movie !== null) {
      const length = movie.results.length
      let i = 0
      while (i + 3 < length) {
        row.push(<Row key={i}><CardGroup>
          <Movie key={movie.results[i].id} movie={movie.results[i]} />
          <Movie key={movie.results[i + 1].id} movie={movie.results[i + 1]} />
          <Movie key={movie.results[i + 2].id} movie={movie.results[i + 2]} />
          </CardGroup>
        </Row>)
        
        i = i + 3
      }
        
      if ( length - i === 1) {
          row.push(<Row key={length - 1 }><CardGroup>
            <Movie key={movie.results[length - 1].id} movie={movie.results[length - 1]} />
            <Card></Card>
            <Card></Card>
            </CardGroup></Row>)
      } else if (length - i === 2)  {
        row.push(<Row key={length}><CardGroup>
            <Movie key={movie.results[length - 2].id} movie={movie.results[length - 2]} />
            <Movie key={movie.results[length - 1].id} movie={movie.results[length - 1]} />
            <Card></Card>
            </CardGroup></Row>)
      }
    }

    return row

  }

  return (
    <div>
      {(user !== null) ? <NavigationBar username= {user.username} logout={logout} /> : <></>}
      <h1 className='text-info text-center'>MOVIE DATABASE</h1>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      { (user === null) ?
          <LoginForm login={login} /> :
         <div>            
            <div>
              <SearchForm search={search} />
                <Container className='p-3 mb-2' fluid="md">
                  {showGridMovies(movie)}
                </Container>
          </div>
          <div>{(movie !== null) ? <Footer search={search} textSearch={textSearch} pageNumbers={movie.total_pages} /> : <></>}</div>
         </div> 
      }
    </div>
  );
}

export default App;
