import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const Movie = ({ movie }) => {

    const img = (movie.poster_path) ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : null
    
    const video = (movie.videos.results.length !== 0) ? `https://www.youtube.com/embed/${movie.videos.results[0].key}` : null

    const releaseDate = `(${movie.release_date.substring(0, movie.release_date.indexOf("-"))})`


    let genresName = ''

    const genres = movie.genres

    for (let i = 0; i < genres.length ; i++) {
        if (i + 1 === genres.length)
            genresName = genresName.concat(genres[i].name)
        else
            genresName = genresName.concat(`${genres[i].name} | `)
    }

    return (
        <Container>
            <Row>
              <Col />
              <Col><h3 className='text-info text-center'>{movie.title}  {releaseDate}</h3></Col>  
            </Row>
            <Row>
                <Col><Image src={img} thumbnail /></Col>
                <Col>
                    <Row>{movie.overview}</Row>
                    <br/>
                    <Row>{(video) ? <Container><iframe width="420" height="315" src={video} /></Container> : <></>}</Row> 
                    <Row />
                    <br/>
                    <Row><Container>Generos: {genresName}</Container></Row>
                </Col>
            </Row>

        </Container>
    ) 

}

export default Movie