import React, { useState, useEffect } from 'react'



import Notification from './component/Notification'
import NavigationBar from './component/NavigationBar'

import loginService from './service/login'
import movieService from './service/movie'
import userService from './service/user'
import premioService from './service/premio'

import utils from './utils/utils'
import Awards from './enums/Awards'





const App = () => {
  const [ user, setUser ] = useState(null)
  const [ movie, setMovie ] = useState(null)
  const [ movieDetail, setMovieDetail ] = useState(null)
  const [ premio, setPremio ] = useState(null)
  const [ premioGanadores, setPremioGanadores] = useState(null)
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

 useEffect(() => {
    const response = premioService.getPremios()
    response.then(response => {
        Awards.setValues(response)    
    }).catch(error => {
        setErrorMessage('No se han podido cargar los premios')
        setTimeout(() => { setErrorMessage(null) }, 5000)
    })
 
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
      setPremioGanadores(null)
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

 

  const loadMovieDetail = async (id) => {
    
    try {
      const peli = await movieService.getMovieById(id)

      setPremio(null)
      setPremioGanadores(null)
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
      setPremioGanadores(null)
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

  const loadPremio = async (premioCod, anyo) => {
    try {
      const award = await premioService.getPremiosByCodigoAnyo(premioCod, anyo)

      setPremioGanadores(award)
      setPremio(null)
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
      setPremioGanadores(null)
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
      setPremioGanadores(null)
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

  const showPremio = (premio) => {
    setPremio(premio)
    setPremioGanadores(null)
    setMovie(null)
    setParamSearch(null)
    setMovieDetail(null)
    setShowSearchForm(false)
    setShowFavoritos(true)
    setShowCartelera(false)
    setShowCrearCuenta(false)
    setShowProfile(false)
  }

  
  
  return (
    <div>
      {(user !== null) ? <NavigationBar user={user} logout={logout} loadCartelera={loadCartelera} showPremio={showPremio} loadFavs={loadFavs} loadProfile={loadProfile}/> : <></>}
      {utils.showHeader(user, movieDetail, showProfile, premio, premioGanadores)}
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      {utils.showBody(user, showCrearCuenta, login, createUser, handleCrearCuenta, updateUser, showProfile, 
                        movieDetail, loadMovieDetail, showSearchForm, movie, premio, premioGanadores, loadPremio, addFavoritos, removeFavoritos, addVote,
                        search)}
      {utils.showFooter(user, movie, showCartelera, showFavoritos, search, paramSearch, loadCartelera, loadFavs)}
    </div>
  )
}

export default App
