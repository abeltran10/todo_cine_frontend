import React, { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import  Button from 'react-bootstrap/Button'


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons'
import {faStar as regularStar} from '@fortawesome/free-regular-svg-icons'

const Movie = ({ userFavs, movie, addFavoritos, removeFavoritos }) => {
    const [vote, setVote] = useState(0)

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

    const rating = () => {

        const handleVote = async (rate) => {
            //await vote(rate, movie)

            setVote((vote !== rate ) ? rate : 0)
        }

        const starsRating = []
        for (let i=1; i <= 5; i++)
            starsRating.push(<FontAwesomeIcon key={i} icon={(i <= vote) ? solidStar : regularStar } onClick={() => handleVote(i)}/>)

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
                    <br/>
                    <Row><Container><span className="fw-bold fst-italic">Votos totales:</span> {movie.vote_count}</Container></Row>
                    <Row><Container><span className="fw-bold fst-italic">Puntuación:</span> {movie.vote_average}</Container></Row>
                    
                </Col>
            </Row>

        </Container>
    ) 

}

export default Movie