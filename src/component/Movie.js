import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const Movie = ({ movie }) => {

    const img = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`

    return (
        <Container>
            <h3 className='text-info text-center'>{movie.original_title}</h3>
            <Row>
                <Col> <Image src={img} thumbnail /></Col>
                <Col>{movie.overview}</Col>
            </Row>
        </Container>
    ) 

}

export default Movie