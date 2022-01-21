import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container, OverlayTrigger, Tooltip, InputGroup, FormControl, Nav, Navbar } from 'react-bootstrap';
import { useState } from 'react';

import { ShowLogin, ShowSignup, SearchHomepage } from "../exports";

function NavbarHome() {
  const [id, setId] = useState("");
  var actualId : string = "";

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Linkedin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="nav__searchBar">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">Recherchez un utilisateur par son ID</Tooltip>} children={
              <InputGroup className="d-flex">
                <SearchHomepage id={id}/>
                <FormControl
                  placeholder="Recherche ..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={id} onChange={e => { actualId = e.target.value; setId(e.target.value)}}
                />
              </InputGroup>
              }    ></OverlayTrigger>
            </div>
          </Nav>
          <ShowSignup />
          <ShowLogin />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function Body() {
  return (
    <>
    <div className="homepage__left">
      <h2>Bienvenue dans votre communauté professionnelle !</h2>
    </div>
    <div className="homepage__right">
      <img alt="" src="https://img.freepik.com/free-vector/office-employee-sits-desktop-front-computer-monitor-clerk-accountant_165429-1104.jpg?size=626&ext=jpg"></img>
    </div>
    </>
  );
}

export {
  NavbarHome,
  Body
}