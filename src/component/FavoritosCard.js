import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const FavoritosCard = ({movie, pagina, loadMovieDetail, updateVista}) => {
  
  const img = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`


  const handleLoadMovieDetail = async (id) => {
      await loadMovieDetail(id)
  }

  const handleVista = async (isVista) => {
     await updateVista(movie, isVista, pagina) 
  }

  const releaseDate = movie.release_date ? `(${movie.release_date.substring(0, movie.release_date.indexOf("-"))})` : ''

  const isVista = movie.vista

  return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{movie.title}  {releaseDate}</Card.Title>
            <Card.Text>
              {movie.overview}
            </Card.Text>
            <br/>
            <br/>
            {!isVista ? <Row><Container><Button className="addFavsButton" variant="secondary" type="button" onClick={() => handleVista(!isVista)}>No vista</Button></Container></Row> : 
                            <Row><Container><Button variant="secondary" type="button" onClick={() => handleVista(!isVista)}>Vista</Button></Container></Row> }
            <br/>
            <br/>
            <Button className="detalleButton" variant="primary" onClick={() => handleLoadMovieDetail(movie.id)}>Detalle</Button>
            
          </Card.Body>
      </Card>      
  )
}

export default FavoritosCard