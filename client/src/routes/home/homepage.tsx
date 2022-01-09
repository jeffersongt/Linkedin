import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { ShowLogin, ShowSignup } from "../exports";

function NavbarHome() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Linkedin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
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