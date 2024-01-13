import React, { useState } from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CreateAccountForm = ({ createUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passConfirm, setPassConfirm ] = useState('')

 
  const handleCreateUser = async (event) => {
    event.preventDefault()

    if (password === passConfirm) {
        await createUser(username, password)

        setUsername('')
        setPassword('')
        setPassConfirm('')
    }
      
  }


  return (
      <Container fluid="md">
              <Row>
                <Col>
                  <Form onSubmit={handleCreateUser}>
                    <Form.Group className="mb-3" controlId="formGroupUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" value={username} name="username" onChange={({target}) => setUsername(target.value)} placeholder="Username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)} placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" value={passConfirm} name="passConfirm" onChange={({ target }) => setPassConfirm(target.value)} placeholder="Confirm Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Crear cuenta</Button>
                  </Form>
                </Col>
            </Row>
            <br />
            <br/>
            {(passConfirm !== '' && (password !== passConfirm)) ? <Row><Col className='bg-danger'><p>Las contraseñas no coinciden</p></Col></Row> : <></>}
          </Container>   
   
  )

}

export default CreateAccountForm