import React, { useState } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import  AccordionItem  from 'react-bootstrap';

const Movie = ({ movie }) => {
    
  return (
    <Container className="rounded p-3 mb-2 bg-light text-dark" fluid="md">
      <Row>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey={movie.id}>
          <Accordion.Header>{movie.title} {movie.release_date.substring(0, movie.release_date.indexOf('-'))}</Accordion.Header>
          <Accordion.Body>
              <h3>{movie.title}</h3>
          </Accordion.Body>
          </Accordion.Item>
        </Accordion>
     </Row>
    </Container>
      
  )
}

export default Movie