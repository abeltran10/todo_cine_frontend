import React, { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import  Button from 'react-bootstrap/Button'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons'
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons'

const Movie = ({ userFavs, movie, addFavoritos, removeFavoritos, addVote, userVote }) => {
    const currentVote = (userVote.length !== 0) ? userVote[0].voto : 0

    const [vote, setVote] = useState(currentVote)

    const showAddButton = (userFavs.length === 0)

    const img = (movie.poster_path) ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : null
    
    const video = (movie.videos.length !== 0) ? `https://www.youtube.com/embed/${movie.videos[0].key}` : null

    const releaseDate = `(${movie.release_date.substring(0, movie.release_date.indexOf("-"))})`

    const handleFavoritos = async () => {
        await addFavoritos(movie)
    }

    const handleRemoveFav = async () => {
        await removeFavoritos(movie.id)
    }

    const handleVote = async (rate) => {
        await addVote(movie.id, rate)

        setVote(rate)
    }

    const rating = () => {
        const starsRating = []
        for (let i=1; i <= 5; i++)
            starsRating.push(<FontAwesomeIcon className={`voto-${i}`} key={i} icon={(i <= vote) ? solidStar : regularStar } onClick={() => handleVote(i)}/>)

        return (starsRating)
        
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
                    {showAddButton ? <Row><Container><Button className="addFavsButton" variant="secondary" type="button" onClick={handleFavoritos}>Añadir a favoritos</Button></Container></Row> : 
                            <Row><Container><Button variant="secondary" type="button" onClick={handleRemoveFav}>Quitar de favoritos</Button></Container></Row> }
                    <br/>
                    <Row><Container><span className="fw-bold fst-italic">Géneros:</span> {movie.genres.map(g => g.name).join(' | ')}</Container></Row>
                    <br/>
                    <Row>
                        <Container>
                            <span className="fw-bold fst-italic">Valora:</span>  {rating()}
                        </Container>
                    </Row>
                    <Row>
                        <Container>
                            <span id='total_votos' className="fw-bold fst-italic">Total votos Todo Cine:</span>  {movie.total_votos_TC}
                        </Container>
                    </Row>
                    <Row>
                        <Container>
                            <span id='votos_media' className="fw-bold fst-italic">Puntuación TC:</span>  {movie.votos_media_TC}
                        </Container>
                    </Row>
                    <br/>
                    <br/>
                    <Row><Container><span className="fw-bold fst-italic">Votos totales:</span> {movie.vote_count}</Container></Row>
                    <Row><Container><span className="fw-bold fst-italic">Puntuación:</span> {movie.vote_average}</Container></Row>
                    
                </Col>
            </Row>

        </Container>
    ) 

}

export default Movie