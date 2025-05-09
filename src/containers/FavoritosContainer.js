import React, { useState, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup'
import Card  from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';

import FavoritosCard from '../component/movie/FavoritosCard'
import NavigationBar from '../component/layout/NavigationBar';
import Notification from '../component/common/Notification';
import Header from '../component/layout/Header';
import Paginator from '../component/movie/Paginator';


import userService from '../service/user'
import usuarioMovieService from '../service/usuarioMovie'



const FavoritosContainer = () => {
    const title = 'FAVORITOS'
    
    const loggedUser = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUser)

    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [movies, setMovies] = useState(null)
    const [usuario, setUsuario] = useState(user)


    const loadUserFavs = async(userId, pagina) => {
        try {
            const pelis = await userService.getUserFavs(userId, pagina)
            setMovies(pelis) 
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setTimeout(() => { setErrorMessage(null) }, 5000)
        }
         
    }

    useEffect(() => {
            console.log(usuario)
            loadUserFavs(usuario.id, 1)
        }, [])



     const updateVista = async (movie, isVista, pagina) => {
        try {
          const usuarioMovie = {usuarioId: usuario.id, movieId: movie.id, vista: isVista, favoritos: movie.favoritos, voto: movie.voto} 
    
          await usuarioMovieService.updateUsuarioMovie(usuario.id, movie.id, usuarioMovie)
          await loadUserFavs(usuario.id, pagina)
          
          setSuccessMessage(isVista ? 'Película vista' : 'Película no vista')
          setTimeout(() => { setSuccessMessage(null) }, 5000)
        } catch(error) {
          setErrorMessage(error.response.data.message)
          setTimeout(() => { setErrorMessage(null) }, 5000)
        }
    
    
    }    
    
    const showGridFavoritos = (movies) => {
        const row = []
        console.log(movies)
        if (movies !== null) {
          const length = movies.results.length
          let i = 0
          while (i + 3 <= length) {
            row.push(<Row key={i}><CardGroup>
              <FavoritosCard key={i} movie={movies.results[i]} pagina={movies.page} updateVista={updateVista}/>
              <FavoritosCard key={i + 1} movie={movies.results[i + 1]} pagina={movies.page}  updateVista={updateVista}/>
              <FavoritosCard key={i + 2} movie={movies.results[i + 2]} pagina={movies.page}  updateVista={updateVista}/>
              </CardGroup>
            </Row>)
            
            i = i + 3
          }
            
          if ( length - i === 1) {
              row.push(<Row key={length - 1}><CardGroup>
                <FavoritosCard key={length - 1} movie={movies.results[length - 1]} pagina={movies.page}  updateVista={updateVista} />
                <Card></Card>
                <Card></Card>
                </CardGroup></Row>)
          } else if (length - i === 2)  {
            row.push(<Row key={length - 2}><CardGroup>
                <FavoritosCard key={length - 2} movie={movies.results[length - 2]} pagina={movies.page}  updateVista={updateVista}/>
                <FavoritosCard key={length - 1} movie={movies.results[length - 1]} pagina={movies.page}  updateVista={updateVista}/>
                <Card></Card>
                </CardGroup></Row>)
          }
        }
      
        return row
      
    }

    return (
        <div>
            <NavigationBar user={usuario} setErrorMessage={setErrorMessage}/>
            <Notification successMessage={successMessage} errorMessage={errorMessage}/>
            <Header title={title} />            
            {movies ?  <Container fluid="md">{showGridFavoritos(movies)}</Container> : <></>}
            {movies ? <Paginator functionSearch={loadUserFavs} param={usuario.id} pageNumbers={movies.total_pages} /> : <></>}
        </div>
    )

}

export default FavoritosContainer