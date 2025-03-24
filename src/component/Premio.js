import React from 'react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Premio = ({ganador, loadMovieDetail}) => {
  
  const img = `https://image.tmdb.org/t/p/w500/${ganador.movie.poster_path}`


  const handleLoadMovieDetail = async (id) => {
      await loadMovieDetail(id)
  }

  const releaseDate = `(${ganador.movie.release_date.substring(0, ganador.movie.release_date.indexOf("-"))})`

  return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{ganador.categoria}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{ganador.movie.original_title}  {releaseDate}</Card.Subtitle>
            <Card.Text>
              {ganador.movie.overview}
            </Card.Text>
            <Button className="detalleButton" variant="primary" onClick={() => handleLoadMovieDetail(ganador.movie.id)}>Detalle</Button>
          </Card.Body>
      </Card>      
  )
}

export default Premio