import React from 'react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { useNavigate } from 'react-router-dom'

const MovieCard = ({movie}) => {
  const navigate = useNavigate()
  
  const img = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`


  const handleLoadMovieDetail = async (id) => {
      navigate(`/moviedetail/${id}`)
  }

  const releaseDate = movie.release_date ? `(${movie.release_date.substring(0, movie.release_date.indexOf("-"))})` : ''

  return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={img} />
                  <Card.Body>
                    <Card.Title>{movie.title}  {releaseDate}</Card.Title>
                    <Card.Text>
                      {movie.overview}
                    </Card.Text>
                    <Button className="detalleButton" variant="primary" onClick={() => handleLoadMovieDetail(movie.id)}>Detalle</Button>
                  </Card.Body>
               </Card>  
  )
}

export default MovieCard