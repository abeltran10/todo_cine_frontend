import React from 'react';
import { useState } from 'react';

import { Form, Row, Col, Button, Navbar, Container, Nav } from 'react-bootstrap';

const FavoritosFiltros = ({usuarioId, loadUserFavs, vistaFiltro, setVistaFiltro}) => {
    
    const handleVista = async(vistaFiltro) => {
        await loadUserFavs({usuarioId, vistaFiltro}, 1)
        setVistaFiltro(vistaFiltro)
        
    }

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Nav className="me-auto d-flex align-items-center">
                    <p className="mb-0 me-3">Filtros: </p>
                    <Form>
                        <Form.Group as={Row} className="mb-0" controlId="filtroVista">
                                <Form.Label column sm="3">Vistas: </Form.Label>
                                <Col sm="9">
                                    <Form.Select value={vistaFiltro} onChange={({target}) => handleVista(target.value)}>
                                        <option value=''>Todas</option>
                                        <option value='S'>Vistas</option>
                                        <option value='N'>No vistas</option>
                                    </Form.Select>
                                </Col>
                        </Form.Group>
                    </Form>                    
                </Nav>
            </Container>
        </Navbar>
    )
    
}

export default FavoritosFiltros