import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

const NavigationBar = ({username, logout}) => {


  const handleLogout = async (event) => {
    event.preventDefault()

    await logout()
  } 


    return (
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">{username}</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <Button variant="link" onClick={handleLogout}>Logout</Button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )
}

export default NavigationBar


