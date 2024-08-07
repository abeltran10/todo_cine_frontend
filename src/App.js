import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup'
import Card  from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


import LoginForm from './component/LoginForm'
import Notification from './component/Notification'
import SearchForm from './component/SearchForm'
import MovieCard from './component/MovieCard'
import Paginator from './component/Paginator'
import NavigationBar from './component/NavigationBar'
import Movie from './component/Movie'
import CreateAccountForm from './component/CreateAccountForm'
import Profile from './component/Profile'
import Premio from './component/Premio';

import loginService from './service/login'
import movieService from './service/movie'
import userService from './service/user'
import premioService from './service/premio'
import { NULL } from 'sass';





const App = () => {
  const [ user, setUser ] = useState(null)
  const [ movie, setMovie ] = useState(null)
  const [ movieDetail, setMovieDetail ] = useState(null)
  const [ premio, setPremio ] = useState(null)
  const [ paramSearch, setParamSearch ] = useState('')
  const [ showSearchForm, setShowSearchForm ] = useState(false)
  const [ showCartelera, setShowCartelera ] = useState(false)
  const [ showFavoritos, setShowFavoritos ] = useState(false)
  const [ showCrearCuenta, setShowCrearCuenta ] = useState(false)
  const [ showProfile, setShowProfile ] = useState(false)
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

  const handleCrearCuenta = () => {
      setShowCrearCuenta(true)
  }

  const logout = async () => {
    try {
      await loginService.logout()

      window.localStorage.removeItem('loggedUserToken')
      window.localStorage.removeItem('loggedUserMovie')

      setPremio(null)
      setUser(null)
      setMovie(null)
      setParamSearch(null)
      setMovieDetail(null)
      setShowSearchForm(false)
      setShowCartelera(false)
      setShowFavoritos(false)
      setShowCrearCuenta(false)
      setShowProfile(false)
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

  const showGridPremios = (categorias) => {
    const row = []
    if (categorias !== null) {
      const length = categorias.length
      let i = 0
      while (i + 3 <= length) {
        row.push(<Row key={i}><CardGroup>
          <Premio key={categorias[i].movie.id} categoria={categorias[i]} loadMovieDetail={loadMovieDetail}/>
          <Premio key={categorias[i + 1].movie.id} categoria={categorias[i + 1]} loadMovieDetail={loadMovieDetail}/>
          <Premio key={categorias[i + 2].movie.id} categoria={categorias[i + 2]} loadMovieDetail={loadMovieDetail}/>
          </CardGroup>
        </Row>)
        
        i = i + 3
      }
        
      if ( length - i === 1) {
          row.push(<Row key={length - 1 }><CardGroup>
            <Premio key={categorias[length - 1].movie.id} categoria={categorias[length - 1]} loadMovieDetail={loadMovieDetail} />
            <Card></Card>
            <Card></Card>
            </CardGroup></Row>)
      } else if (length - i === 2)  {
        row.push(<Row key={length}><CardGroup>
            <Premio key={categorias[length - 2].movie.id} categoria={categorias[length - 2]} loadMovieDetail={loadMovieDetail}/>
            <Premio key={categorias[length - 1].movie.id} categoria={categorias[length - 1]} loadMovieDetail={loadMovieDetail}/>
            <Card></Card>
            </CardGroup></Row>)
      }
    }

    return row

  }

  const loadMovieDetail = async (id) => {
    
    try {
      const peli = await movieService.getMovieById(id)

      setPremio(null)
      setMovieDetail(peli)
      setMovie(null)
      setParamSearch(null)
      setShowSearchForm(false)
      setShowFavoritos(false)
      setShowCartelera(false)
      setShowCrearCuenta(false)
      setShowProfile(false)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }

  const loadCartelera = async (region, page) => {
    try {
      const pelis = await movieService.getMoviesPlayingNowByRegion(region, page)

      setPremio(null)
      setMovie(pelis)
      setMovieDetail(null)
      setShowSearchForm(false)
      setShowFavoritos(false)
      setShowCartelera(true)
      setParamSearch(region)
      setShowCrearCuenta(false)
      setShowProfile(false)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
    
  }

  const loadPremios = async (codigo) => {
    try {
      const award = await premioService.getPremiosByCodigo(codigo)

      setPremio(award)
      setMovie(null)
      setMovieDetail(null)
      setShowSearchForm(false)
      setShowFavoritos(false)
      setShowCartelera(true)
      setParamSearch(null)
      setShowCrearCuenta(false)
      setShowProfile(false)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
    
  }


  const addFavoritos = async (movie) => {    
    try {
      const response = await userService.addFavsByUserId(user.id, movie)
      setMovie(response)
      const usuario = {...user, favoritos: [...user.favoritos, {movieId: response.id}]}
      setUser(usuario)
      window.localStorage.setItem('loggedUserMovie', JSON.stringify(usuario))
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
      
      const favs = user.favoritos.filter(favs => favs.movieId !== movieId)
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
      const response = await userService.getUserFavs(userId, pagina)
      
      setPremio(null)
      setMovie(response)
      setParamSearch(null)
      setMovieDetail(null)
      setShowSearchForm(false)
      setShowFavoritos(true)
      setShowCartelera(false)
      setShowCrearCuenta(false)
      setShowProfile(false)
    } catch(error) {
      console.log(error)
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    } 
  }

  const loadProfile = () => {
      setPremio(null)
      setMovie(null)
      setParamSearch(null)
      setMovieDetail(null)
      setShowSearchForm(false)
      setShowFavoritos(false)
      setShowCartelera(false)
      setShowCrearCuenta(false)
      setShowProfile(true)
  }

  const createUser = async (username, password) => {
    try {
      const response = await userService.createUser({ username, password })
      
      setShowCrearCuenta(false)
      setSuccessMessage('Cuenta creada con exito')
      setTimeout(() => { setSuccessMessage(null) }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
  }   
  
  const updateUser = async (username, password, passConfirm) => {
    
        if (password !== passConfirm) {
          setErrorMessage('Las password no coinciden')
          setTimeout(() => { setErrorMessage(null) }, 5000)
        } else {
          try {
            const usuario = {...user, username, password}
            
            const response = await userService.updateUser(usuario)
            setUser(response)
            
            setSuccessMessage('Usuario actualizado con exito')
            setTimeout(() => { setSuccessMessage(null) }, 5000)
          } catch (error) {
            setErrorMessage(error.response.data.message)
            setTimeout(() => { setErrorMessage(null) }, 5000)
          }
        }

  }

  const addVote = async (movieId, rating) => {
    const vote = {usuarioId: user.id, movieId, voto: rating}

    try {
      const peli = await movieService.votar(movieId, user.id, vote)
      setMovieDetail(peli)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
    
    
  }

  const showHeader = () => {
    if (user === null)
      return (<h1 className='text-info text-center'>TODO CINE</h1>)
    else if (movieDetail)
      return (<h1 className='text-info text-center'>DETALLE</h1>)
    else if (showProfile)
      return (<h1 className='text-info text-center'>PERFIL</h1>)
    else if (premio)
      return (<h1 className='text-info text-center'>{premio.titulo.toUpperCase()}</h1>)
    else
      return (<h1 className='text-info text-center'>PELÍCULAS</h1>)
   
  }

  const showBody = () => {
      const container = (pelis) => {
                  return (<Container className='p-3 mb-2' fluid="md">
                     {showGridMovies(pelis)}
                 </Container>)
      }

      const premios = (premio) => {
        return (<Container className='p-3 mb-2' fluid="md">
                    {showGridPremios(premio.categorias)}
                  </Container>)
      }
    
      if (user === null && !showCrearCuenta)
        return (<div><LoginForm login={login} handleCrearCuenta={handleCrearCuenta}/></div>)

      else if (user === null && showCrearCuenta)
        return (<div>
                <NavigationBar user={null} logout={null} loadCartelera={null} loadFavs={null} loadProfile={null}/>
                <CreateAccountForm createUser={createUser} />
              </div>)
      
      else if (showProfile)
        return (<div><Profile usuario={user} updateUser={updateUser} /></div>)
      
      else if (movieDetail)
        return (<div><Movie userFavs={user.favoritos.filter(fav => fav.movieId === movieDetail.id)} movie={movieDetail} addFavoritos={addFavoritos} 
                    removeFavoritos={removeFavoritos} addVote={addVote} userVote={movieDetail.votos.filter(v => v.usuarioId === user.id)}/></div>)
      
      else if (showSearchForm)
          return (<div>
                    <div><SearchForm search={search} /></div>
                    {(movie) ? container(movie) : <></>}
                  </div>
                  )
      
      else if (movie) 
        return (<div>{container(movie)}</div>)
      
      else if (premio) 
        return (<div>{premios(premio)}</div>)
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
      {(user !== null) ? <NavigationBar user={user} logout={logout} loadCartelera={loadCartelera} loadPremios={loadPremios} loadFavs={loadFavs} loadProfile={loadProfile}/> : <></>}
      {showHeader()}
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      {showBody()}
      {showFooter()}
    </div>
  )
}

export default App
