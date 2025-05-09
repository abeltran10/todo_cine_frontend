import React, { useState } from 'react'

import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import  Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

const Profile = ({ usuario, updateUser }) => {
    const [password, setPassword] = useState('')
    const [passConfirm, setPassConfirm ] = useState('')


    const handleUpdate = async (event) => {
        event.preventDefault()

        await updateUser(usuario.username, password, passConfirm)

        setPassword('')
        setPassConfirm('')
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
        </Container>
    ) 

}

export default Profile