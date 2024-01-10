import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Regions from '../enums/Regions'
import { NavbarCollapse } from 'react-bootstrap'


const NavigationBar = ({user, logout, loadCartelera, loadFavs}) => {


  const handleLogout = async () => {
    await logout()
  } 

  const handleCartelera = async (region) => {
    await loadCartelera(region, 1)
  }

  const handleFavs = async (userId) => {
    await loadFavs(userId, 1)
  }


  const signed = `Signed as ${user.username}`

    return (
       <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#brand">Todo Cine</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href="/app">Home</Nav.Link>{'  '}
              <NavDropdown title="Cartelera" id="navbarScrollingDropdown">
                {Regions.getValues().map(k => <NavDropdown.Item key={k[0]} onClick={() => handleCartelera(k[1])}>{k[2]}</NavDropdown.Item>)}
              </NavDropdown>      
              <NavDropdown title={signed} id="navbarScrollingDropdown">
              <NavDropdown.Item href="#fav" onClick={() => handleFavs(user.id)}>Favoritos</NavDropdown.Item>
                <NavDropdown.Item href="#logout" onClick={handleLogout}>Log out</NavDropdown.Item>
              </NavDropdown>
           </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavigationBar


