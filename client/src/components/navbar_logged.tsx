import '../App.css';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { InputSearch } from '../routes/search/search';

function NavbarLogged() {
  return (
    <>
    <Navbar bg="light" expand="lg" style={{position: 'sticky', top: 0}}>
      <Container>
        <Navbar.Brand href="#home">Linkedin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <div className="nav__searchBar">
            <InputSearch/>
          </div>
          </Nav>
          <div className="nav__companies">
            <Companies/>
          </div>
          <div className="nav__profile">
            <Profile/>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

function Companies() {
  let navigate = useNavigate();

  return (
    <Button variant="outline-primary" onClick={() => { navigate('/entreprises') }}>Entreprises</Button>
  );
}

function Profile() {
  let navigate = useNavigate();

  return (
    <Button variant="dark" onClick={() => { navigate('/profil') }}><FontAwesomeIcon icon={faUser} style={{color: 'white'}}/></Button>
  );
}

export default NavbarLogged;