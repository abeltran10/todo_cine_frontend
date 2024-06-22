import React from 'react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Premio = ({categoria, loadMovieDetail}) => {
  
  const img = `https://image.tmdb.org/t/p/w500/${categoria.movie.poster_path}`


  const handleLoadMovieDetail = async (id) => {
      await loadMovieDetail(id)
  }

  const releaseDate = `(${categoria.movie.release_date.substring(0, categoria.movie.release_date.indexOf("-"))})`

  return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>{categoria.nombre}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{categoria.movie.original_title}  {releaseDate}</Card.Subtitle>
            <Card.Text>
              {categoria.movie.overview}
            </Card.Text>
            <Button className="detalleButton" variant="primary" onClick={() => handleLoadMovieDetail(categoria.movie.id)}>Detalle</Button>
          </Card.Body>
      </Card>      
  )
}

export default Premio