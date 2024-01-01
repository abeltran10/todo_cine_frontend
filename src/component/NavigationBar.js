import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'


const NavigationBar = ({username}) => {
    return (
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">{username}</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <a href="/app/logout">Logout</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )
}

export default NavigationBar


