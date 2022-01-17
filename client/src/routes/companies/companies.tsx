import '../../App.css';
import { useState } from 'react';
import { Container, Col, Row, Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import Divider from "@material-ui/core/Divider";
import axios from 'axios';
import NavbarLogged from '../../components/navbar_logged';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

function Companies() {
    return (
        <>
         <div style={{
            backgroundImage: `url("https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")`,backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
          }}>
            <NavbarLogged/>
            <Body/>
        </div>
        </>
    );
}

function Body() {
  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [adress, setAdress] = useState("");
  let company = { name: "", domain: "", adress: "", nb_employees: 0 };

  return (
    <>
      <Row>
        <Col md={12} className="centered__buttons">
          <Button variant="success" style={{marginTop: 10, marginBottom: 10}} onClick={handleShowAdd}>Ajouter une entreprise</Button>
          <Modal show={showAdd} onHide={handleCloseAdd}>
            <Modal.Header closeButton>
                <Modal.Title>Entreprise X</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nom de l'entreprise</Form.Label>
                <Form.Control type="text" placeholder=" Entrer ici ..." value={name} onChange={e => { company.name = e.target.value; setName(e.target.value)}}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Domaine</Form.Label>
                <Form.Control type="text" placeholder="Entrer ici ..." value={domain} onChange={e => { company.domain = e.target.value; setDomain(e.target.value)}}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPosition">
                <Form.Label>Adresse</Form.Label>
                <Form.Control type="text" placeholder="Entrer ici ..." value={adress} onChange={e => { company.adress = e.target.value; setAdress(e.target.value)}}/>
              </Form.Group>
            </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleCloseAdd}>Annuler</Button>
                <Button variant="primary" onClick={() => {
                  const params = {
                    name: name,
                    domain: domain,
                    adress: adress
                  }
                  const url : string = "http://localhost:8000/users/me/companies";
                  axios.post(url, params, { withCredentials: true })
                    .then(res => {
                      console.log(res);
                      alert("L'entreprise " + res.data.name + " a bien été créée !");
                    })
                    .catch(function (error) {
                      if (error.response) {
                        console.log(error.response.data.error.message);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
                      }})
                  handleCloseAdd();
                }}>Ajouter l'entreprise</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      {/* <Container className="companies__my"> */}
        {/* Voir si on afficherait pas toutes les entreprises */}

        {/* <Row>
          <Col md={4}>
            <h3 style={{fontWeight: 'normal', marginTop: 15}}>Mes entreprises</h3>
          </Col>
        </Row>
        <br/> */}

        {/* Fetch the companies and generate the rows
        <Divider />
        <br/>
        <Row>
          <Col md={11}>
            <a style={{fontWeight: 'bold', fontSize: 23}}>TerraForma</a>
            <br/>
            <a style={{opacity: 0.7, fontSize: 20}}>Formations</a>
            <br/>
            <a>3 rue de la flûte, 75013 Paris</a>
            <br/>
            <a><a style={{fontWeight: 'bold'}}>25</a> employés</a>
          </Col>
          <Col md={1} style={{alignItems: 'flex-end'}}>
            
          </Col>
        </Row>
        <br/> */}
      {/* </Container> */}
    </>
  );
}

export default Companies;