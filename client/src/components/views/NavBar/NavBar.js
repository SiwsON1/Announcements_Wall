import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/usersRedux';


const NavBar = () => {
  const user = useSelector(getUser);
  return (
    
    <Navbar bg="primary" variant="dark" expand="lg" className="mt-4 mb-4 rounded">
    <Container>
      <Navbar.Brand href="/">Announcements.app</Navbar.Brand>
        <Nav className="d-flex justify-content-end">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          {user && <Nav.Link as={NavLink} to="/ad/add">New Add</Nav.Link>}
          {user && <Nav.Link as={NavLink} to="/logout">Logout</Nav.Link>}
          {user === null  && <Nav.Link as={NavLink} to="/login">Login</Nav.Link>}
          {user === null  && <Nav.Link as={NavLink} to="/register">Register</Nav.Link>}
        </Nav>
    </Container>
  </Navbar>
      
    
  );
};

export default NavBar;