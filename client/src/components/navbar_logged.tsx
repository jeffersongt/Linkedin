import '../App.css';
import { Navbar, Container, Nav, Button, InputGroup, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

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
            <SearchBar/>
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

function SearchBar() {
  let navigate = useNavigate();

  return (
    <>
    <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="button-tooltip-2">Recherchez une entreprise par son ID</Tooltip>} children={
      <InputGroup className="d-flex">
        <Button variant="outline-secondary" onClick={() => { navigate('/recherche') }}><FontAwesomeIcon icon={faSearch} style={{color: 'black'}}/></Button>
        <FormControl
          placeholder="Recherche ..."
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    }    ></OverlayTrigger>
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