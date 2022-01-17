import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row, OverlayTrigger, Tooltip, InputGroup, Button, FormControl, Nav, Navbar } from 'react-bootstrap';
import { ShowLogin, ShowSignup } from "../exports";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

function NavbarHome() {
  const [id, setId] = useState("");
  let actualId : string = "";

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Linkedin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="nav__searchBar">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">Recherchez un utilisateur par son ID</Tooltip>} children={
              <InputGroup className="d-flex">
                <Button variant="outline-secondary" onClick={() => {
                  //navigate('/recherche')
                  const url_user : string = "http://localhost:8000/users/" + id;
                  axios.get(url_user, { withCredentials: true })
                    .then(res => {
                      console.log(res);
                      alert("L'utilisateur " + res.data.email + " a été trouvé !");
                    })
                    .catch(function (error) {
                      if (error.response) {
                        console.log(error.response.data.error.message);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        alert("La recherche pour l'ID " + id + " n'a pas aboutie.");
                    }})
                  setId("");
                }}><FontAwesomeIcon icon={faSearch} style={{color: 'black'}}/></Button>
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