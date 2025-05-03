import React from 'react'


import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'


const PremioAnyos = ({premioCod, premioAnyo, loadPremio}) => {
   
   const handleLoadPremio = async (premioCod, premioAnyo) => {
        await loadPremio({premioCod, premioAnyo}, 1)
   }
   
   
   return (<div>
             <Card style={{ width: '18rem' }}>
                <Card.Body>
                   <Card.Title>{premioAnyo}</Card.Title>
                   <Button className="detalleButton" variant="primary" onClick={() => handleLoadPremio(premioCod, premioAnyo)}>Detalle</Button>
                </Card.Body>
             </Card>  
           </div>
   )
}


export default PremioAnyos