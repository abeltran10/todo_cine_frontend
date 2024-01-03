import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const Movie = ({ movie }) => {

    const img = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    
    let key = (movie.videos.results.length !== 0) ? movie.videos.results[0].key : null

    const video = `https://www.youtube.com/embed/${key}`

    return (
        <Container>
            <Row>
              <Col />
              <Col><h3 className='text-info text-center'>{movie.original_title}</h3></Col>  
            </Row>
            <Row>
                <Col> <Image src={img} thumbnail /></Col>
                <Col>
                    <Row>{movie.overview}</Row>
                    <br/>
                    <Row>{(key) ? <Container><iframe width="420" height="315" src={video} /></Container> : <></>}</Row>  
                </Col>
            </Row>

        </Container>
    ) 

}

export default Movie