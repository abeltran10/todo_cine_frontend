import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import NavigationBar from '../component/layout/NavigationBar'
import Header from '../component/layout/Header'
import Notification from '../component/common/Notification'
import SearchForm from '../component/movie/SearchForm'
import Paginator from '../component/movie/Paginator'
import MovieCard from '../component/movie/MovieCard'

import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup'
import Card  from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';

import Regions from '../enums/Regions'

import movieService from '../service/movie'

const CarteleraContainer = () => {
    const { region } = useParams()
    
    const regions = Regions.getRegion(region)

    const title = `CARTELERA ${regions[2].toUpperCase()}`

    const loggedUser = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUser)

    const [usuario, setUsuario] = useState(user)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [movies, setMovies] = useState(null)

    
    
   const loadCartelera = async (region, page) => {
       try {
           const pelis = await movieService.getMoviesPlayingNowByRegion(region, page)
           setMovies(pelis)
        } catch (error) {
            setErrorMessage(error.response.data.message)
            setTimeout(() => { setErrorMessage(null) }, 5000)
        }
            
    }
    
        useEffect(() => {
                loadCartelera(region, 1)
            }, [])

    const showGridMovies = (movies) => {
        const row = []
        if (movies !== null) {
          const length = movies.results.length
          let i = 0
          while (i + 3 <= length) {
            row.push(<Row key={i}><CardGroup>
              <MovieCard key={i} movie={movies.results[i]} />
              <MovieCard key={i + 1} movie={movies.results[i + 1]} />
              <MovieCard key={i + 2} movie={movies.results[i + 2]} />
              </CardGroup>
            </Row>)
            
            i = i + 3
          }
            
          if ( length - i === 1) {
              row.push(<Row key={length - 1}><CardGroup>
                <MovieCard key={length - 1} movie={movies.results[length - 1]} />
                <Card></Card>
                <Card></Card>
                </CardGroup></Row>)
          } else if (length - i === 2)  {
            row.push(<Row key={length - 2}><CardGroup>
                <MovieCard key={length - 2} movie={movies.results[length - 2]} />
                <MovieCard key={length - 1} movie={movies.results[length - 1]} />
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
            {movies ? <Container fluid="md">{showGridMovies(movies)}</Container> : <></>}
            {movies ? <Paginator functionSearch={loadCartelera} param={region} pageNumbers={movies.total_pages} /> : <></>}
        </div>
    )

}

export default CarteleraContainer