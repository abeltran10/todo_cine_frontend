import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'

const NavigationBar = ({username, logout, loadCartelera}) => {


  const handleLogout = async (event) => {
    event.preventDefault()

    await logout()
  } 

  const handleCartelera = async (event) => {
    event.preventDefault()

    await loadCartelera()
  }


  const signed = `Signed as ${username}`

    return (
       <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#brand">Todo Cine</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#cartelera"><Button variant="link" onClick={handleCartelera}>Cartelera</Button></Nav.Link>
          <NavDropdown title={signed} id="navbarScrollingDropdown">
              <NavDropdown.Item href="#logout"><Button variant="danger" onClick={handleLogout}>Log out</Button></NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavigationBar


