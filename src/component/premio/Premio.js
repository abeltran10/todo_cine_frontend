import React from 'react'

import { useNavigate } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Premio = ({ganador}) => {
  const navigate = useNavigate()

  const img = `https://image.tmdb.org/t/p/w500/${ganador.poster_path}`


  const handleLoadMovieDetail = async (id) => {
    navigate(`/app/moviedetail/${id}`)
}

  const releaseDate = `(${ganador.release_date.substring(0, ganador.release_date.indexOf("-"))})`

  return (
      
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{ganador.categoria}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{ganador.original_title}  {releaseDate}</Card.Subtitle>
            <Card.Text>
              {ganador.overview}
            </Card.Text>
            <Button className="detalleButton" variant="primary" onClick={() => handleLoadMovieDetail(ganador.movieId)}>Detalle</Button>
          </Card.Body>
        </Card>              
      
  )
}

export default Premio