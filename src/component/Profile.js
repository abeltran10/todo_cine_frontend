import React, { useState } from 'react'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import  Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

const Profile = ({ usuario, updateUser, removeFavoritos }) => {
    const [password, setPassword] = useState('')
    const [passConfirm, setPassConfirm ] = useState('')


    const handleUpdate = async (event) => {
        event.preventDefault()

        await updateUser(usuario.username, password, passConfirm)

        setPassword('')
        setPassConfirm('')
    }

    const handleRemoveFav = async (movieId) => {
        await removeFavoritos(movieId)
    }

    const showCard = (movie) => {
        console.log('Movie', movie)
        const img = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        const releaseDate = `(${movie.release_date.substring(0, movie.release_date.indexOf("-"))})`

        return (<Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={img} />
                        <Card.Body>
                            <Card.Title>{movie.title}  {releaseDate}</Card.Title>
                            <Card.Text>
                            {movie.overview}
                            </Card.Text>
                            <Button variant="secondary" type="button" onClick={() => handleRemoveFav(movie.id)}>Quitar de favoritos</Button>
                        </Card.Body>
                </Card>)      
    }

    const showGridMovies = (favoritos) => {
        const row = []
        if (favoritos !== null) {
          const length = favoritos.length
          let i = 0
          while (i + 3 <= length) {
            row.push(<Row key={i}><CardGroup>
              {showCard(favoritos[i].movie)}
              {showCard(favoritos[i + 1].movie)}
              {showCard(favoritos[i + 2].movie)}
              </CardGroup>
            </Row>)
            
            i = i + 3
          }
            
          if ( length - i === 1) {
              row.push(<Row key={length - 1 }><CardGroup>
                {showCard(favoritos[length - 1].movie)}
                <Card></Card>
                <Card></Card>
                </CardGroup></Row>)
          } else if (length - i === 2)  {
            row.push(<Row key={length}><CardGroup>
                {showCard(favoritos[length - 2].movie)}
                {showCard(favoritos[length - 1].movie)}
                <Card></Card>
                </CardGroup></Row>)
          }
        }
    
        return row
    
      }

   return (
        <Container>
           <Row>
                <Col>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group className="mb-3" controlId="formGroupUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control disabled type="text" value={usuario.username} name="username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" value={password} name= "password" onChange={({ target }) => setPassword(target.value)} placeholder="New Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" value={passConfirm} name="passConfirm" onChange={({ target }) => setPassConfirm(target.value)} placeholder="Confirm Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">Actualizar</Button>
                    </Form>
                </Col>
            </Row>
            <Row></Row>
            <Row></Row>
            <Row>
                <Col><h3 className='text-info text-center'>Favoritos</h3></Col>
            </Row>
            <Row>
                <Col>
                    {showGridMovies(usuario.favoritos)}
                </Col>
            </Row>

        </Container>
    ) 

}

export default Profile