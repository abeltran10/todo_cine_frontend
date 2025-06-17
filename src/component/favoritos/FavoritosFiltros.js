import React from 'react';
import { useState } from 'react';

import { Form, Row, Col, Button, Navbar, Container, Nav } from 'react-bootstrap';

const FavoritosFiltros = ({usuarioId, loadUserFavs, vistaFiltro, setVistaFiltro, votadaFiltro, setVotadaFiltro}) => {
    
    const handleVista = async(vistaFiltro) => {
        await loadUserFavs({usuarioId, vistaFiltro, votadaFiltro}, 1)
        setVistaFiltro(vistaFiltro)
        
    }

    const handleVotada = async(votadaFiltro) => {
        await loadUserFavs({usuarioId, vistaFiltro, votadaFiltro}, 1)
        setVotadaFiltro(votadaFiltro)
        
    }

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Nav className="me-auto d-flex align-items-center">
                    <p className="mb-0 me-3">Filtros: </p>
                    <Form>
                        <Form.Group as={Row} className="align-items-center mb-0" controlId="filtros">
                            <Col sm="6" className="d-flex align-items-center">
                            <Form.Label className="mb-0 me-2" style={{ width: "80px" }}>
                                Vistas:
                            </Form.Label>
                            <Form.Select
                                value={vistaFiltro}
                                onChange={({ target }) => handleVista(target.value)}
                            >
                                <option value="">Todas</option>
                                <option value="S">Vistas</option>
                                <option value="N">No vistas</option>
                            </Form.Select>
                            </Col>
                            <Col sm="6" className="d-flex align-items-center">
                            <Form.Label className="mb-0 me-2" style={{ width: "100px" }}>
                                Puntuadas:
                            </Form.Label>
                            <Form.Select
                                value={votadaFiltro}
                                onChange={({ target }) => handleVotada(target.value)}
                            >
                                <option value="">Todas</option>
                                <option value="S">Puntuadas</option>
                                <option value="N">No puntuadas</option>
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