import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import React, { useState } from 'react'

const SearchForm = ({ search }) => {
    const [ moviename, setMoviename ] = useState('')

    const handleSearch = async (event) => {
        event.preventDefault()
    
        await search(moviename)
    
        setMoviename('')
    }

    return (
        <Container fluid="md">
                <Row>
                  <Col>
                    <Form onSubmit={handleSearch}>
                      <Form.Group className="mb-3" controlId="formGroupSearch">
                        <Form.Label>Busca película</Form.Label>
                        <Form.Control type="text" value={moviename} name="moviename" onChange={({target}) => setMoviename(target.value)} placeholder="Busca película" />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                          Busca
                      </Button>
                    </Form>
                  </Col>
              </Row>
            </Container>   
     
    )
}

export default SearchForm