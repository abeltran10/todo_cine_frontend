import React, { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import  Button from 'react-bootstrap/Button'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons'
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons'

const Movie = ({movieDetail, addFavoritos, removeFavoritos, addVote}) => {
    const showAddButton = movieDetail.favoritos

    const currentVote = movieDetail.voto

    const img = (movieDetail.poster_path) ? `https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}` : null
    
    const video = (movieDetail.videos.length !== 0) ? `https://www.youtube.com/embed/${movieDetail.videos[0].key}` : null

    const releaseDate = movieDetail.release_date ? `(${movieDetail.release_date.substring(0, movieDetail.release_date.indexOf("-"))})` : ''


    const handleFavoritos = async () => {
        await addFavoritos(movieDetail)
    }

    const handleRemoveFav = async () => {
        await removeFavoritos(movieDetail)
    }

    const handleVote = async (rate) => {
        await addVote(movieDetail, rate)
    }

    const rating = () => {
        const starsRating = []
        for (let i=1; i <= 5; i++)
            starsRating.push(<FontAwesomeIcon className={`voto-${i}`} key={i} icon={(i <= currentVote) ? solidStar : regularStar } onClick={() => handleVote(i)}/>)

        return (starsRating)
        
    }
    
    return (
            <Container>
                <Row>
                <Col />
                <Col><h3 className='text-info text-center'>{movieDetail.title}  {releaseDate}</h3></Col>  
                </Row>
                <Row>
                    <Col><Image src={img} thumbnail /></Col>
                    <Col>
                        <Row>{movieDetail.overview}</Row>
                        <br/>
                        <Row>{(video) ? <Container><iframe width="420" height="315" src={video} /></Container> : <></>}</Row> 
                        <Row />
                        <br/>
                        {!showAddButton ? <Row><Container><Button className="addFavsButton" variant="secondary" type="button" onClick={handleFavoritos}>Añadir a favoritos</Button></Container></Row> : 
                                <Row><Container><Button variant="secondary" type="button" onClick={handleRemoveFav}>Quitar de favoritos</Button></Container></Row> }
                        <br/>
                        <Row><Container><span className="fw-bold fst-italic">Géneros:</span> {movieDetail.genres.map(g => g.name).join(' | ')}</Container></Row>
                        <br/>
                        <Row>
                            <Container>
                                <span className="fw-bold fst-italic">Valora:</span>  {rating()}
                            </Container>
                        </Row>
                        <Row>
                            <Container>
                                <span id='total_votos' className="fw-bold fst-italic">Total votos Todo Cine:</span>  {movieDetail.total_votos_TC}
                            </Container>
                        </Row>
                        <Row>
                            <Container>
                                <span id='votos_media' className="fw-bold fst-italic">Puntuación TC:</span>  {movieDetail.votos_media_TC}
                            </Container>
                        </Row>
                        <br/>
                        <br/>
                        <Row><Container><span className="fw-bold fst-italic">Votos totales:</span> {movieDetail.vote_count}</Container></Row>
                        <Row><Container><span className="fw-bold fst-italic">Puntuación:</span> {movieDetail.vote_average}</Container></Row>
                        
                    </Col>
                </Row>
            </Container>        
    ) 

}

export default Movie