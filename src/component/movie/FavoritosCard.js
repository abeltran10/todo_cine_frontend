import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router-dom'

const FavoritosCard = ({movie, pagina, updateVista}) => {
  const navigate = useNavigate()

  const img = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`


  const handleVista = async (isVista) => {
    await updateVista(movie, isVista, pagina)


  }

  const handleLoadMovieDetail = async (id) => {
    navigate(`/app/moviedetail/${id}`)
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
            <Row><Container><Form.Check type="switch" id="custom-switch" label="Vista" checked={isVista} onClick={() => handleVista(!isVista)}></Form.Check></Container></Row> 
            <br/>
            <br/>
            <Button className="detalleButton" variant="primary" onClick={() => handleLoadMovieDetail(movie.id)}>Detalle</Button>
            
          </Card.Body>
        </Card>
      
  )
}

export default FavoritosCard