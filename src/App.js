import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';

import LoginForm from './component/LoginForm'
import Notification from './component/Notification'
import SearchForm from './component/SearchForm'
import Movie from './component/Movie'
import Footer from './component/Footer'


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

  const search = async (mov, page) => {
    try {
      setTextSearch(mov)
      console.log(mov)
      movieService.setToken(window.localStorage.getItem('movieToken'))
      
      const pelis = await movieService.getByName(mov, page)
      setMovie(pelis)
    
    }
     catch (exception) {
      setErrorMessage('Error in search')
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
            </CardGroup></Row>)
      } else if (length - i === 2)  {
        row.push(<Row key={length}><CardGroup>
            <Movie key={movie.results[length - 2].id} movie={movie.results[length - 2]} />
            <Movie key={movie.results[length - 1].id} movie={movie.results[length - 1]} />
            </CardGroup></Row>)
      }
    }

    return row

  }

  return (
    <div>
      <h1 className='text-info text-center'>MOVIE DATABASE</h1>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      { (user === null) ?
          <LoginForm login={login} /> :
         <div>
          <div>
            <SearchForm search={search} />
                <Container className='p-3 mb-2' fluid="md">
                  {showGridMovies(movie).map(r => r)}
                </Container>
          </div>
          <div>{(movie !== null) ? <Footer search={search} textSearch={textSearch} pages={movie.total_pages} /> : <></>}</div>
         </div> 
      }
    </div>
  );
}

export default App;
