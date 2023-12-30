import React from 'react'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Movie = ({movie}) => {
  
  const img = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

  return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{movie.title} {movie.release_date.substring(0, movie.release_date.indexOf("-"))}</Card.Title>
            <Card.Text>
              {movie.overview}
            </Card.Text>
            <Button variant="primary">Detalle</Button>
          </Card.Body>
      </Card>      
  )
}

export default Movie