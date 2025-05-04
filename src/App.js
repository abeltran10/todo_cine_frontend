import React, { useState, useEffect } from 'react'



import Notification from './component/Notification'
import NavigationBar from './component/NavigationBar'

import loginService from './service/login'
import movieService from './service/movie'
import userService from './service/user'
import premioService from './service/premio'
import usuarioMovieService from './service/usuarioMovie'

import utils from './utils/utils'
import Awards from './enums/Awards'





const App = () => {
  const [ user, setUser ] = useState(null)
  const [ movies, setMovies ] = useState(null)
  const [ movieDetail, setMovieDetail ] = useState(null)
  const [ premioAnyos, setPremioAnyos ] = useState(null)
  const [ premioGanadores, setPremioGanadores] = useState(null)
  const [ paramSearch, setParamSearch ] = useState('')
  const [ showSearchForm, setShowSearchForm ] = useState(false)
  const [ showCartelera, setShowCartelera ] = useState(false)
  const [ showFavoritos, setShowFavoritos ] = useState(false)
  const [ showCrearCuenta, setShowCrearCuenta ] = useState(false)
  const [ showProfile, setShowProfile ] = useState(false)
  const [ awards, setAwards ] = useState([])
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    const loggedUserMovie = window.localStorage.getItem('loggedUserMovie')

    if (loggedUserMovie) {
      const user = JSON.parse(loggedUserMovie)
      
      const response = userService.getUser(user.id)
      response.then(response => {
          window.localStorage.setItem('loggedUserMovie', JSON.stringify(response))
          
          setUser(response)
          setShowSearchForm(true)

          const responseAward = premioService.getPremios()
          responseAward.then(response => {
            Awards.setValues(response)
            setAwards(Awards.getValues())                 
          }).catch(error => {
              setErrorMessage('No se han podido cargar los premios')
              setTimeout(() => { setErrorMessage(null) }, 5000)
          })

         
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
      const response = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUserToken', response.headers.getAuthorization())
     
      const user = response.data

      setUser(user)
      setShowSearchForm(true)
      setSuccessMessage('Iniciada sesión')
      setTimeout(() => { setSuccessMessage(null) }, 5000)
      window.localStorage.setItem('loggedUserMovie', JSON.stringify(user))

      const responseAward = premioService.getPremios()
      responseAward.then(response => {
          Awards.setValues(response)
          setAwards(Awards.getValues())    
      }).catch(error => {
          setErrorMessage('No se han podido cargar los premios')
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

      setPremioAnyos(null)
      setPremioGanadores(null)
      setUser(null)
      setMovies(null)
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
      setMovies(pelis)
      setParamSearch(text)
      setMovieDetail(null)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }   
  }

 

  const loadMovieDetail = async (id) => {
    
    try {
      const peli = await movieService.getDetailMovieById(id)

      setPremioAnyos(null)
      setPremioGanadores(null)
      setMovieDetail(peli)
      setMovies(null)
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

      setPremioAnyos(null)
      setPremioGanadores(null)
      setMovies(pelis)
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

  const loadPremio = async ({premioCod, premioAnyo}, pagina) => {
    try {
      const award = await premioService.getPremiosByCodigoAnyo(premioCod, premioAnyo, pagina)

      setPremioGanadores(award)
      setPremioAnyos(null)
      setMovies(null)
      setMovieDetail(null)
      setShowSearchForm(false)
      setShowFavoritos(false)
      setShowCartelera(false)
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
      const usuarioMovie = {usuarioId: user.id, movieId: movie.id, vista: movie.vista, favoritos: true, voto: movie.voto}  

      const response = await usuarioMovieService.updateUsuarioMovie(user.id, movie.id, usuarioMovie)
      setMovieDetail(response)
      
      setSuccessMessage('Añadida película a favoritos')
      setTimeout(() => { setSuccessMessage(null) }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
    
  }

  const removeFavoritos = async (movie) => {    
    try {
      const usuarioMovie = {usuarioId: user.id, movieId: movie.id, vista: movie.vista, favoritos: false, voto: movie.voto} 

      const response = await usuarioMovieService.updateUsuarioMovie(user.id, movie.id, usuarioMovie)
      setMovieDetail(response)
      
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
      
      setPremioAnyos(null)
      setPremioGanadores(null)
      setMovies(response)
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

  const updateVista = async (movie, isVista, pagina) => {
    try {
      const usuarioMovie = {usuarioId: user.id, movieId: movie.id, vista: isVista, favoritos: movie.favoritos, voto: movie.voto} 

      await usuarioMovieService.updateUsuarioMovie(user.id, movie.id, usuarioMovie)
      const pelis = await userService.getUserFavs(user.id, pagina)

      setMovies(pelis)
      
      setSuccessMessage('Película vista')
      setTimeout(() => { setSuccessMessage(null) }, 5000)
    } catch(error) {
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }


  }

  const loadProfile = () => {
      setPremioAnyos(null)
      setPremioGanadores(null)
      setMovies(null)
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
      await userService.createUser({ username, password })
      
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

  const addVote = async (movie, rating) => {
    try {
      const usuarioMovie = {usuarioId: user.id, movieId: movie.id, vista: movie.vista, favoritos: movie.favoritos, voto: rating} 

      const response = await usuarioMovieService.updateUsuarioMovie(user.id, movie.id, usuarioMovie)
      setMovieDetail(response)
    } catch (error) {
      setErrorMessage(error.response.data.message)
      setTimeout(() => { setErrorMessage(null) }, 5000)
    }
    
    
  }

  const showPremioAnyos = (premioAnyos) => {
    setPremioAnyos(premioAnyos)
    setPremioGanadores(null)
    setMovies(null)
    setParamSearch(null)
    setMovieDetail(null)
    setShowSearchForm(false)
    setShowFavoritos(false)
    setShowCartelera(false)
    setShowCrearCuenta(false)
    setShowProfile(false)
  }

  const uiState = {
    showCrearCuenta,
    showSearchForm,
    showCartelera,
    showFavoritos,
    showProfile,
    successMessage,
    errorMessage
  }

  const movieState = {
    movies,
    movieDetail,
    premioAnyos,
    premioGanadores,
    paramSearch
  }

  const handlers = {
    login,
    logout,
    createUser,
    handleCrearCuenta,
    updateUser,
    loadMovieDetail,
    loadCartelera,
    loadFavs,
    loadPremio,
    addFavoritos,
    removeFavoritos,
    updateVista,
    addVote,
    search
  }
  
  return (
    <div>
      {user && (
        <NavigationBar
          user={user}
          logout={logout}
          loadCartelera={loadCartelera}
          showPremioAnyos={showPremioAnyos}
          loadFavs={loadFavs}
          loadProfile={loadProfile}
        />
      )}

      {utils.showHeader({ user, movieState, uiState })}
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      {utils.showBody({ user, uiState, movieState, handlers })}
      {utils.showFooter({ user, movieState, uiState, handlers })}
    </div>
  )
}

export default App
