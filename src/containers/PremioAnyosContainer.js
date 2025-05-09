import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup'
import Container from 'react-bootstrap/Container';

import PremioAnyos from '../component/premio/PremioAnyos';

import Awards from '../enums/Awards'
import NavigationBar from '../component/layout/NavigationBar';
import Notification from '../component/common/Notification';
import Header from '../component/layout/Header';



const PremioAnyosContainer = () => {
    const { premioId } = useParams()
    
    const award = Awards.getAward(premioId)

    const title = `${award[1].toUpperCase()}`

    const loggedUser = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUser)

    const [usuario, setUsuario] = useState(user)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const showGridPremioAnyos = (premioAnyos) => {
        console.log(premioAnyos[2]) 
        
          const row = []
          const anyos = premioAnyos[2].length
          let i = 0
          while (i + 3 <= anyos) {
            row.push(
                <Row key={i}>      
                <CardGroup>
                    <PremioAnyos id={i} premioCod={premioAnyos[0]} premioAnyo={premioAnyos[2][i]}/>
                    <PremioAnyos id={i + 1} premioCod={premioAnyos[0]} premioAnyo={premioAnyos[2][i + 1]} />
                    <PremioAnyos id={i + 2} premioCod={premioAnyos[0]} premioAnyo={premioAnyos[2][i + 2]} />
                </CardGroup>
              </Row>  
            )
      
          i = i + 3
          }
      
          if (anyos - i === 1) { 
            row.push(
                <Row key={anyos - 1}>      
                <CardGroup>
                   <PremioAnyos id={anyos - 1} premioCod={premioAnyos[0]} premioAnyo={premioAnyos[2][anyos - 1]} />
                </CardGroup>
              </Row> 
            ) 
          } else if (anyos - i === 2) {
            row.push(
                <Row key={anyos - 2}>      
                  <CardGroup>
                    <PremioAnyos id={anyos - 2} premioCod={premioAnyos[0]} premioAnyo={premioAnyos[2][anyos - 2]} />
                    <PremioAnyos id={anyos - 1} premioCod={premioAnyos[0]} premioAnyo={premioAnyos[2][anyos - 1]} />
                  </CardGroup>
              </Row> 
            ) 
          }
          
          return row
       }

       return (
        <div>
            <NavigationBar user={usuario} setErrorMessage={setErrorMessage}/>
            <Notification successMessage={successMessage} errorMessage={errorMessage}/>
            <Header title={title} />            
            <Container fluid="md">{showGridPremioAnyos(award)}</Container> 
        </div>
    )


}

export default PremioAnyosContainer