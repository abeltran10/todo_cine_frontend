import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Regions from '../enums/Regions'


const NavigationBar = ({user, logout, loadCartelera, loadFavs, loadProfile}) => {


  const handleLogout = async () => {
    await logout()
  } 

  const handleCartelera = async (region) => {
    await loadCartelera(region, 1)
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
              <Nav.Link href="/app">Home</Nav.Link>{'  '}
              {(user) ? logged() : <></>}
           </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavigationBar


