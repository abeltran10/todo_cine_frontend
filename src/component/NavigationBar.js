import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Regions from '../enums/Regions'
import Awards from '../enums/Awards'


const NavigationBar = ({user, logout, loadCartelera, loadPremios, loadFavs, loadProfile}) => {


  const handleLogout = async () => {
    await logout()
  } 

  const handleCartelera = async (region) => {
    await loadCartelera(region, 1)
  }

  const handlePremios = async (codigo) => {
    await loadPremios(codigo)
  }

  const handleFavs = async (userId) => {
    await loadFavs(userId, 1)
  }

  const handleProfile = () => {
    loadProfile()
  }

  const logged = () => {
    return (
      <>
        <NavDropdown title="Cartelera" id="navbarScrollingDropdown">
          {Regions.getValues().map(k => <NavDropdown.Item key={k[0]} onClick={() => handleCartelera(k[1])}>{k[2]}</NavDropdown.Item>)}
        </NavDropdown>
        <NavDropdown title="Premios" id="navbarScrollingDropdown">
          {Awards.getValues().map(k => <NavDropdown.Item key={k[0]} onClick={() => handlePremios(k[0])}>{k[1]}</NavDropdown.Item>)}
        </NavDropdown>     
        <NavDropdown title={`Signed as ${user.username}`} id="navbarScrollingDropdown">
          <NavDropdown.Item href="#profile" onClick={handleProfile}>Perfil</NavDropdown.Item>
          <NavDropdown.Item href="#fav" onClick={() => handleFavs(user.id)}>Favoritos</NavDropdown.Item>
          <NavDropdown.Item href="#logout" onClick={handleLogout}>Log out</NavDropdown.Item>
        </NavDropdown>
      </>
    )
  }

  return (
       <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#brand">Todo Cine</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href=".">Home</Nav.Link>{'  '}
              {(user) ? logged() : <></>}
           </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavigationBar


