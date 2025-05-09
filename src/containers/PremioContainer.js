import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup'
import Card  from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';

import Premio from '../component/premio/Premio';
import NavigationBar from '../component/layout/NavigationBar';
import Notification from '../component/common/Notification';
import Header from '../component/layout/Header';
import Paginator from '../component/movie/Paginator';

import premioService from '../service/premio'
import userService from '../service/user'

import Awards from '../enums/Awards'

const PremioContainer = () => {
    const { premioCod, premioAnyo } = useParams()

    const award = Awards.getAward(premioCod)

    const title = `${award[1].toUpperCase()} ${premioAnyo}`

    const loggedUser = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(loggedUser)


    const [usuario, setUsuario] = useState(user)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [ganadores, setGanadores] = useState(null)


    const loadPremio = async ({premioCod, premioAnyo}, pagina) => {
        try {
          const ganadores = await premioService.getPremiosByCodigoAnyo(premioCod, premioAnyo, pagina)
          setGanadores(ganadores)
        } catch (error) {
          setErrorMessage(error.response.data.message)
          setTimeout(() => { setErrorMessage(null) }, 5000)
        }
        
    }

    useEffect(() => {
          loadPremio({premioCod, premioAnyo}, 1)
    }, [])

    const showGridGanadores = (ganadores) => {
        const row = []
        if (ganadores.results !== null) {
          const length = ganadores.results.length
          let i = 0
          while (i + 3 <= length) {
            row.push(<Row key={i}><CardGroup>
              <Premio key={i} ganador={ganadores.results[i]}/>
              <Premio key={i + 1} ganador={ganadores.results[i + 1]} />
              <Premio key={i + 2} ganador={ganadores.results[i + 2]} />
              </CardGroup>
            </Row>)
            
            i = i + 3
          }
            
          if ( length - i === 1) {
              row.push(<Row key={length - 1}><CardGroup>
                <Premio key={length - 1} ganador={ganadores.results[length - 1]}  />
                <Card></Card>
                <Card></Card>
                </CardGroup></Row>)
          } else if (length - i === 2)  {
            row.push(<Row key={length - 2}><CardGroup>
                <Premio key={length - 2} ganador={ganadores.results[length - 2]} />
                <Premio key={length - 1} ganador={ganadores.results[length - 1]} />
                <Card></Card>
                </CardGroup></Row>)
          }
        }
      
        return row
      
      }

      const parameters = {premioCod, premioAnyo}

      return (
        <div>
            <NavigationBar user={usuario} setErrorMessage={setErrorMessage}/>
            <Notification successMessage={successMessage} errorMessage={errorMessage}/>
            <Header title={title} />            
            {ganadores ? <Container fluid="md">{showGridGanadores(ganadores)}</Container> : <></>}
            {ganadores ? <Paginator functionSearch={loadPremio} param={parameters} pageNumbers={ganadores.total_pages} /> : <></>}
        </div>
    )

}

export default PremioContainer