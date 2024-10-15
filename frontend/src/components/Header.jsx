import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaArrowRightToBracket } from "react-icons/fa6";

const Header = () => {
  return (
    <header>
      <Navbar bg='dark'data-bs-theme="dark" expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>Patient Record Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='/login'>
                <FaArrowRightToBracket /> Log In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
