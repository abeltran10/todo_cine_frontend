import React from 'react'
import { useNavigate } from 'react-router-dom'


import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


const PremioAnyos = ({premioCod, premioAnyo}) => {
   const navigate = useNavigate()

   const handleLoadPremio = async (premioCod, premioAnyo) => {
        navigate(`/app/premio/${premioCod}/anyo/${premioAnyo}`)
   }
   
   
   return (
             <Card style={{ width: '18rem' }}>
                <Card.Body>
                   <Card.Title>{premioAnyo}</Card.Title>
                   <Button className="detalleButton" variant="primary" onClick={() => handleLoadPremio(premioCod, premioAnyo)}>Detalle</Button>
                </Card.Body>
             </Card>  
           
   )
}


export default PremioAnyos