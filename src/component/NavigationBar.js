import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'

const NavigationBar = ({username, logout}) => {


  const handleLogout = async (event) => {
    event.preventDefault()

    await logout()
  } 

  const signed = `Signed as ${username}`
  
    return (
       <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Todo Cine</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          <NavDropdown title={signed} id="navbarScrollingDropdown">
              <NavDropdown.Item href="#logout"><Button variant="danger" onClick={handleLogout}>Log out</Button></NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NavigationBar


