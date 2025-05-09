import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchForm = ({search}) => {
    const [ text, setText ] = useState('')
       

    const handleSearch = async (event) => {
        event.preventDefault()
    
        await search(text, 1)
    
        setText('')
    }

    return (
      <Container fluid="md">
              <Row>
                  <Col>
                    <Form onSubmit={handleSearch}>
                      <Form.Group className="mb-3" controlId="formGroupSearch">
                        <Form.Label>Busca película</Form.Label>
                        <Form.Control id="moviename" type="text" value={text} name="moviename" onChange={({target}) => setText(target.value)} placeholder="Busca película" />
                      </Form.Group>
                      <Button id='search-submit' variant="primary" type="submit">
                          Busca
                      </Button>
                    </Form>
                  </Col>
              </Row>
            </Container>   
    )
}

export default SearchForm