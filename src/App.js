import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup'
import Card  from 'react-bootstrap/Card'

import LoginForm from './component/LoginForm'
import Notification from './component/Notification'
import SearchForm from './component/SearchForm'
import MovieCard from './component/MovieCard'
import Footer from './component/Footer'
import NavigationBar from './component/NavigationBar'
import Movie from './component/Movie'


import loginService from './service/login'
import movieService from './service/movie'
import userService from './service/user'



const App = () => {
  const [ user, setUser ] = useState(null)
  const [ movie, setMovie ] = useState(null)
  const [ movieDetail, setMovieDetail ] = useState(null)
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
      setMovie(null)
      setTextSearch(null)
      setMovieDetail(null)
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
      setMovieDetail(null)
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
      while (i + 3 <= length) {
        row.push(<Row key={i}><CardGroup>
          <MovieCard key={movie.results[i].id} movie={movie.results[i]} loadMovieDetail={loadMovieDetail}/>
          <MovieCard key={movie.results[i + 1].id} movie={movie.results[i + 1]} loadMovieDetail={loadMovieDetail}/>
          <MovieCard key={movie.results[i + 2].id} movie={movie.results[i + 2]} loadMovieDetail={loadMovieDetail}/>
          </CardGroup>
        </Row>)
        
        i = i + 3
      }
        
      if ( length - i === 1) {
          row.push(<Row key={length - 1 }><CardGroup>
            <MovieCard key={movie.results[length - 1].id} movie={movie.results[length - 1]} loadMovieDetail={loadMovieDetail} />
            <Card></Card>
            <Card></Card>
            </CardGroup></Row>)
      } else if (length - i === 2)  {
        row.push(<Row key={length}><CardGroup>
            <MovieCard key={movie.results[length - 2].id} movie={movie.results[length - 2]} loadMovieDetail={loadMovieDetail}/>
            <MovieCard key={movie.results[length - 1].id} movie={movie.results[length - 1]} loadMovieDetail={loadMovieDetail}/>
            <Card></Card>
            </CardGroup></Row>)
      }
    }

    return row

  }

  const loadMovieDetail = async (id) => {
    
    try {
      const peli = await movieService.getMovieById(id)

      setMovieDetail(peli)
      setMovie(null)
      setTextSearch(null)
    } catch (exception) {
      setErrorMessage('Error al cargar el detalle de la película')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const loadCartelera = async (region) => {
    try {
      const pelis = await movieService.getMoviesPlayingNowByRegion("ES")

      setMovie(pelis)
      setMovieDetail(null)
      setTextSearch(null)
    } catch (exception) {
      setErrorMessage('No hay películas para la región seleccionada')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
    
  }

  const showHeader = () => {
    if (user === null)
      return (<h1 className='text-info text-center'>TODO CINE</h1>)
    else if (user && (movieDetail === null))
      return (<h1 className='text-info text-center'>PELÍCULAS</h1>)
    else if (movieDetail)
      return (<h1 className='text-info text-center'>DETALLE</h1>)
  }

  const showBody = () => {
      if (user === null)
        return (<div><LoginForm login={login} /></div>)
      else if (movieDetail)
        return (<div><Movie movie={movieDetail} /></div>)
      else if (user && movieDetail === null)
        return (<div>
                <SearchForm search={search} />
                <Container className='p-3 mb-2' fluid="md">
                  {showGridMovies(movie)}
                </Container>
              </div>)
  }

  const showFooter = () => {
    if (user && movie)
      return (<div><Footer search={search} textSearch={textSearch} pageNumbers={movie.total_pages} /></div>)

  }

  return (
    <div>
      {(user !== null) ? <NavigationBar username= {user.username} logout={logout} loadCartelera={loadCartelera}/> : <></>}
      {showHeader()}
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      {showBody()}
      {showFooter()}
    </div>
  );
}

export default App;
