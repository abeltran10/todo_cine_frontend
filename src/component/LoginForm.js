import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React, { useState } from 'react'

const LoginForm = ({ login, handleCrearCuenta }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    await login(username, password)

    setUsername('')
    setPassword('')
  }

  const crearCuenta = () => {
    handleCrearCuenta()
  }


  return (
      <Container fluid="md">
              <Row>
                <Col>
                  <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formGroupUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control id="username"type="text" value={username} name="username" onChange={({target}) => setUsername(target.value)} placeholder="Username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control id="password" type="password" value={password} name= "password" onChange={({ target }) => setPassword(target.value)} placeholder="Password" />
                    </Form.Group>
                    <Button id="login-submit"variant="primary" type="submit">Entrar</Button>
                  </Form>
                </Col>
            </Row>
            <br/>
            <Row><Col>Si no tienes cuenta haz click en el enlace <Button variant="link" onClick={crearCuenta}>Crear cuenta</Button></Col></Row>
          </Container>   
   
  )

}

export default LoginForm