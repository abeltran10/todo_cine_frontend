import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Regions from '../../enums/Regions'
import Awards from '../../enums/Awards'

import { useNavigate } from 'react-router-dom'

import loginService from '../../service/login'


const NavigationBar = ({user, setErrorMessage}) => {
  const navigate = useNavigate()

  const logout = async () => {
    try {
        await loginService.logout()

        window.localStorage.removeItem('loggedUserToken')
        window.localStorage.removeItem('loggedUser')

        navigate(`/app/`)

    } catch(exception) {
        setErrorMessage('Error al abandonar la sesión')
        setTimeout(() => { setErrorMessage('') }, 5000)
    }
    
  } 

  const handleLoadCartelera = (region) => {
      navigate(`/app/region/${region}`)
  }

  const handleShowPremio = (premioId) => {
    navigate(`/app/premio/${premioId}`)

  }


  const handleLoadFavoritos = () => {
    navigate(`/app/favoritos`)
  }

  const loadProfile = () => {
    navigate(`/app/profile`)
  }

  return (
      <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="/app/">Todo Cine</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <Nav.Link href="/app/">Home</Nav.Link>{'  '}
                <NavDropdown title="Cartelera" id="navbarScrollingDropdown">
                  {Regions.getValues().map(k => <NavDropdown.Item key={k[0]} onClick={() => handleLoadCartelera(k[1])}>{k[2]}</NavDropdown.Item>)}
                </NavDropdown>
                <NavDropdown title="Premios" id="navbarScrollingDropdown">
                  {Awards.getValues().map(item => <NavDropdown.Item key={item[0]} onClick={() => handleShowPremio(item[0])}>{item[1]}</NavDropdown.Item>)}
                </NavDropdown>     
                <NavDropdown title={`Signed as ${user.username}`} id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#profile" onClick={loadProfile}>Perfil</NavDropdown.Item>
                  <NavDropdown.Item href="#fav" onClick={handleLoadFavoritos}>Favoritos</NavDropdown.Item>
                  <NavDropdown.Item href="#logout" onClick={logout}>Log out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
  )
}

export default NavigationBar


