import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCredentials } from '../slices/authSlice';
import { useLogoutAdminMutation } from '../slices/adminApiSlice';
import { useLogoutPatientMutation } from '../slices/patientApiSlice';
import { useLogoutHcpMutation } from '../slices/hcpApiSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutAdmin] = useLogoutAdminMutation();
  const [logoutPatient] = useLogoutPatientMutation();
  const [logoutHcp] = useLogoutHcpMutation();

  const logoutHandler = async () => {
    try {
      if (userInfo.role === 'Admin') {
        await logoutAdmin().unwrap();
      } else if (userInfo.role === 'Patient') {
        await logoutPatient().unwrap();
      } else if (userInfo.role === 'Hcp') {
        await logoutHcp().unwrap();
      }
      dispatch(clearCredentials());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg='dark' data-bs-theme="dark" expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Patient Record Portal</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <NavDropdown title={`${userInfo.name} (${userInfo.role})`} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaSignInAlt /> Log in
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
