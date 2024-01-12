import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup'
import Card  from 'react-bootstrap/Card'

import LoginForm from './component/LoginForm'
import Notification from './component/Notification'
import SearchForm from './component/SearchForm'
import MovieCard from './component/MovieCard'
import Paginator from './component/Paginator'
import NavigationBar from './component/NavigationBar'
import Movie from './component/Movie'

import loginService from './service/login'
import movieService from './service/movie'
import userService from './service/user'



const App = () => {
  const [ user, setUser ] = useState(null)
  const [ movie, setMovie ] = useState(null)
  const [ movieDetail, setMovieDetail ] = useState(null)
  const [ paramSearch, setParamSearch ] = useState('')
  const [ showSearchForm, setShowSearchForm ] = useState(false)
  const [ showCartelera, setShowCartelera ] = useState(false)
  const [ showFavoritos, setShowFavoritos ] = useState(false)
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    const loggedUserMovie = window.localStorage.getItem('loggedUserMovie')

    if (loggedUserMovie) {
      const user = JSON.parse(loggedUserMovie)
      
      const response = userService.getByName(user.username)
      response.then(response => {
          setUser(response)
          window.localStorage.setItem('loggedUserMovie', JSON.stringify(response))
          setShowSearchForm(true)
        }).catch(error => {
          setErrorMessage('La sesión ha caducado')
          setTimeout(() => { setErrorMessage(null) }, 5000)

          window.localStorage.removeItem('loggedUserToken')
          window.localStorage.removeItem('loggedUserMovie')
        })
    }
 }, []) 

  const login = async (username, password) => {
    try {
      const headers = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUserToken', headers.getAuthorization())
     
      const response = userService.getByName(username)

      response.then(response => {
          setUser(response)
          setShowSearchForm(true)
          setSuccessMessage('Iniciada sesión')
          setTimeout(() => { setSuccessMessage(null) }, 5000)
          window.localStorage.setItem('loggedUserMovie', JSON.stringify(response))
      }).catch(error => {
        setErrorMessage(error.response.data.message)
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
        
    } catch (exception) {
      setErrorMessage('Usuario o contraseña incorrectos')
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
      setParamSearch(null)
      setMovieDetail(null)
      setShowSearchForm(false)
      setShowCartelera(false)
      setShowFavoritos(false)
    } catch(exception) {
      setErrorMessage('Error al abandonar la sesión')
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
    
  }

  const search = async (text, page) => {
    try {
      const pelis = await movieService.getByName(text, page)
      setMovie(pelis)
      setParamSearch(text)
      setMovieDetail(null)
    } catch (error) {
      setErrorMessage(error.response.data.message)
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
      setParamSearch(null)
      setShowSearchForm(false)
      setShowFavoritos(false)
      setShowCartelera(false)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const loadCartelera = async (region, page) => {
    try {
      const pelis = await movieService.getMoviesPlayingNowByRegion(region, page)

      setMovie(pelis)
      setMovieDetail(null)
      setShowSearchForm(false)
      setShowFavoritos(false)
      setShowCartelera(true)
      setParamSearch(region)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
    
  }

  const addFavoritos = async (movieId) => {    
    try {
      const response = await userService.addFavsByUserId(user.id, movieId)
      setUser(response)
      setSuccessMessage('Añadida película a favoritos')
      setTimeout(() => { setSuccessMessage(null) }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
    
  }

  const removeFavoritos = async (movieId) => {    
    try {
      await userService.removeFavsByUserId(user.id, movieId)
      
      const favs = user.favoritos.filter(favs => favs.id !== movieId)
      setUser({...user, favoritos: favs})
      setSuccessMessage('Eliminada película de favoritos')
      setTimeout(() => { setSuccessMessage(null) }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
    
  }

  const loadFavs = async (userId, pagina) => {
    try {
      const response = await movieService.getFavsByUserId(userId, pagina)
      
      setMovie(response)
      setParamSearch(null)
      setMovieDetail(null)
      setShowSearchForm(false)
      setShowFavoritos(true)
      setShowCartelera(false)
    } catch(error) {
      console.log(error)
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    } 
  }

  const showHeader = () => {
    if (user === null)
      return (<h1 className='text-info text-center'>TODO CINE</h1>)
    else if (movieDetail)
      return (<h1 className='text-info text-center'>DETALLE</h1>)
    else
      return (<h1 className='text-info text-center'>PELÍCULAS</h1>)
   
  }

  const showBody = () => {
      const container = (pelis) => {
                  return (<Container className='p-3 mb-2' fluid="md">
                     {showGridMovies(pelis)}
                 </Container>)
      }
    
      if (user === null)
        return (<div><LoginForm login={login} /></div>)
      else if (movieDetail)
        return (<div><Movie userFavs={user.favoritos.filter(fav => fav.id === movieDetail.id)} movie={movieDetail} addFavoritos={addFavoritos} removeFavoritos={removeFavoritos}/></div>)
      else if (showSearchForm)
          return (<div>
                    <div><SearchForm search={search} /></div>
                    {(movie) ? container(movie) : <></>}
                  </div>
                  )
      else if (movie) {
        return (<div>
                  {container(movie)}
                </div>)
      }
  }

  const showFooter = () => {      
    if (user && movie && !showCartelera && !showFavoritos)  
      return (<div><Paginator functionSearch={search} param={paramSearch} pageNumbers={movie.total_pages} /></div>)
    else if (user && movie && showCartelera)
      return (<div><Paginator functionSearch={loadCartelera} param={paramSearch} pageNumbers={movie.total_pages} /></div>)
    else if (user && movie && showFavoritos)
    return (<div><Paginator functionSearch={loadFavs} param={user.id} pageNumbers={movie.total_pages} /></div>)
  }
  
  return (
    <div>
      {(user !== null) ? <NavigationBar user={user} logout={logout} loadCartelera={loadCartelera} loadFavs={loadFavs}/> : <></>}
      {showHeader()}
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      {showBody()}
      {showFooter()}
    </div>
  )
}

export default App;
