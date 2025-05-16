import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import movieService from '../service/movie'
import usuarioMovieService from '../service/usuarioMovie'

import NavigationBar from '../component/layout/NavigationBar';
import Movie from '../component/movie/Movie';
import Header from '../component/layout/Header';
import Notification from '../component/common/Notification';

const MovieDetailContainer = () => {
    const { movieId } = useParams()

    const loggedUser = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUser)

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [movieDetail, setMovieDetail] = useState(null)
    const [usuario, setUsuario] = useState(user)

    const loadMovieDetail = async (movieId) => {
        
        try {
          const peli = await movieService.getDetailMovieById(movieId)
          setMovieDetail(peli)      
        } catch (error) {
          setErrorMessage(error.response.data.message)
          setTimeout(() => { setErrorMessage(null) }, 5000)
        }
      }
    
    useEffect(() => {
        loadMovieDetail(movieId)
    }, [])

     const addFavoritos = async (movie) => {    
        try {
          const usuarioMovie = {usuarioId: usuario.id, movieId: movie.id, vista: false, favoritos: true, voto: null}  
    
          const response = await usuarioMovieService.updateUsuarioMovie(usuario.id, movie.id, usuarioMovie)
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
            const usuarioMovie = {usuarioId: usuario.id, movieId: movie.id, vista: false, favoritos: false, voto: null} 
      
            const response = await usuarioMovieService.updateUsuarioMovie(usuario.id, movie.id, usuarioMovie)
            setMovieDetail(response)
            
            setSuccessMessage('Eliminada película de favoritos')
            setTimeout(() => { setSuccessMessage(null) }, 5000)
          } catch (error) {
            setErrorMessage(error.response.data.message)
            setTimeout(() => { setErrorMessage(null) }, 5000)
          }
          
        }

        const addVote = async (movie, rating) => {
            try {
              const usuarioMovie = {usuarioId: usuario.id, movieId: movie.id, vista: movie.vista, favoritos: movie.favoritos, voto: rating} 
              const  response = await usuarioMovieService.updateUsuarioMovie(usuario.id, movie.id, usuarioMovie)
                            
              setMovieDetail(response)
            } catch (error) {
              setErrorMessage(error.response.data.message)
              setTimeout(() => { setErrorMessage(null) }, 5000)
            }
            
            
          }

    return (
        <div>
            <NavigationBar user={usuario} setErrorMessage={setErrorMessage}/>
            <Notification successMessage={successMessage} errorMessage={errorMessage}/>      
            {movieDetail ? <Movie
               movieDetail={movieDetail}
               addFavoritos={addFavoritos}
               removeFavoritos={removeFavoritos}
               addVote={addVote}/> : <></>}
        </div>
    )
}

export default MovieDetailContainer