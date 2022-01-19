import '../../App.css';
import { Container, Button,
   Image, Col, Row, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

import NavbarLogged from '../../components/navbar_logged';
import { signout, deleteAccount, getProfile, patchProfile, getExperience,
  deleteExperience, patchExperience, postExperience,
  getCompetence, postCompetence, deleteCompetence } from '../exports';
import { Infos, Experience, Competence } from '../../helper/types';

var profile : Infos = { id: "", first_name : "", last_name : "", city: "", position: "", company: "" };
var arrExperience : JSX.Element[] = [];
var arrCompetence : JSX.Element[] = [];

function Profile() {
  return (
    <div className="body__style">
      <NavbarLogged/>
      <Body/>
    </div>
  );
}

function Body() {
  return (
    <>
    <PersonalInfosGetUpdate/>
    <ProfileExperiences/>
    <CompetencesList/>
    
    <Row>
      <Col md={12} className="centered__buttons">
        <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={ async () => {await signout()}}>Déconnexion</Button>
      </Col>
    </Row>

    <Row>
      <Col md={12} className="centered__buttons">
          <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={ async () => {await deleteAccount()}}>Supprimer le compte</Button>
      </Col>
    </Row>
    </>
  );
}

function PersonalInfosGetUpdate() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tempFirstName, setTempFirstName] = useState("");
  const [tempLastName, setTempLastName] = useState("");
  const [tempCity, setTempCity] = useState("");
  const [tempPosition, setTempPosition] = useState("");
  const [tempCompany, setTempCompany] = useState("");
  var temporary : Infos = {first_name: "", last_name: "", city: "", position: "", company: "", id: ""};

  useEffect(() => {
    async function fetchProfile() {
      const result = await getProfile();
      if (result.id !== "") {
        profile.first_name = result.first_name;
        profile.last_name = result.last_name;
        profile.city = result.city;
        profile.position = result.position;
        profile.company = result.company;
        profile.id = result.id;
        setTempFirstName(result.first_name);
        setTempLastName(result.last_name);
        setTempCity(result.city);
        setTempPosition(result.position);
        setTempCompany(result.company);
      }
    }
    fetchProfile();
  }, []);
  
  return (
    <>
    <Container className="profile__infos">
      <Row>
        <Col md={11}>
          <h3 style={{fontWeight: 'normal', marginTop: 15}}>Profile</h3>
        </Col>
        <Col md={1} style={{alignItems: 'flex-end', marginTop: 10}}>

          <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={handleShow}><FontAwesomeIcon icon={faPen} style={{color: 'white'}}/></Button>

          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Informations personnelles</Modal.Title>
              </Modal.Header>

              <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control type="text" placeholder=" Entrer ici ..." value={tempFirstName} onChange={e => { temporary.first_name = e.target.value; setTempFirstName(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..."  value={tempLastName} onChange={e => { temporary.last_name = e.target.value; setTempLastName(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPosition">
                  <Form.Label>Poste actuel</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..." value={tempPosition} onChange={e => { temporary.position = e.target.value; setTempPosition(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCity">
                  <Form.Label>Entreprise</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..." value={tempCompany} onChange={e => { temporary.company = e.target.value; setTempCompany(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCity">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..." value={tempCity} onChange={e => { temporary.city = e.target.value; setTempCity(e.target.value)}} />
                </Form.Group>
              </Form>
              </Modal.Body>

              <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>Annuler</Button>
                  <Button variant="primary" onClick={ async () => {
                    const params = {
                      fst_name: tempFirstName,
                      last_name: tempLastName,
                      city: tempCity,
                      position: tempPosition,
                      company: tempCompany,
                    }
                    const result = await patchProfile(params, profile.id);
                    if (result === 0) {
                      window.location.reload();
                      handleClose();
                    }
                  }}>Enregistrer</Button>
              </Modal.Footer>
          </Modal>

        </Col>
      </Row>
      <br/>
      <Divider/>
      <InfosDisplay/>
    </Container>
    </>
  );
}

function InfosDisplay() {
  return (
    <>
    <br/>
    <Row>
      <Col md={11} className="profile__infos__content">
        <Image style={{ width: '20%', marginTop: 5}} src="https://cdn.futura-sciences.com/buildsv6/images/mediumoriginal/1/6/4/1642c0dc85_50184905_bored-ape-yatch-club-2344.jpg" roundedCircle />
        <br/>
        <a style={{fontWeight: 'bold', fontSize: 28}}>{profile.first_name} {profile.last_name}</a>
        <br/>
        <a style={{opacity: 0.9, fontSize: 20}}>{profile.position}</a>
        <br/>
        <a style={{opacity: 0.9, fontSize: 20}}>{profile.company}</a>
        <br/>
        <a style={{opacity: 0.7, fontSize: 17}}>{profile.city}</a>
      </Col>
    </Row>
    </>
  );
}

function ProfileExperiences() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var updateId : string[] = [];
  var updateCity : string[] = [];
  var updatePosition : string[] = [];
  var updateCompany : string[] = [];
  var updateExperience : Experience = { id: "", position : "", company : "", city: "" };

  useEffect(() => {
    async function fetchExperience() {
      const result = await getExperience();

      if (result.id.length > 0) {
        updateId = result.id;
        updatePosition = result.position;
        updateCompany = result.company;
        updateCity = result.city;

        for(let i = 0; i < result.id.length; i++) {
          arrExperience.push(
            <div key={result.id[i]}>
            <Divider />
            <br/>
            <Row>
              <Col md={11}>
                <a style={{fontWeight: 'bold', fontSize: 23}}>
                  {result.position[i]}
                </a>
                <br/>
                <a style={{opacity: 0.7, fontSize: 18}}>
                  {result.company[i]}
                </a>
                <br/>
                <a style={{opacity: 0.7, fontSize: 18}}>
                  {result.city[i]}
                </a>
              </Col>
              <Col md={1} style={{alignItems: 'flex-end'}}>
                <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={handleShow}><FontAwesomeIcon icon={faPen} style={{color: 'white'}}/></Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Expérience {result.id[i]}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicPosition">
                        <Form.Label>Poste</Form.Label>
                        <Form.Control type="text" placeholder=" Entrer ici ..." value={updatePosition[i]} onChange={e => { updateExperience.position = e.target.value; updatePosition[i] = e.target.value}}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicCompany">
                        <Form.Label>Entreprise</Form.Label>
                        <Form.Control type="text" placeholder="Entrer ici ..." value={updateCompany[i]} onChange={e => { updateExperience.company = e.target.value; updateCompany[i] = e.target.value}}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="fo rmBasicLocation">
                        <Form.Label>Ville</Form.Label>
                        <Form.Control type="text" placeholder="Entrer ici ..." value={updateCity[i]} onChange={e => { updateExperience.city = e.target.value; updateCity[i] = e.target.value}}/>
                      </Form.Group>
                    </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={ async () => {
                          const del_result = await deleteExperience(updateId[i]);
                          if (del_result === 0) {
                            window.location.reload();
                          }
                          handleClose();
                        }}>Supprimer l'expérience</Button>
                        <Button variant="primary" onClick={ async () => {
                          const params = {
                            position : updatePosition[i],
                            company : updateCompany[i],
                            city : updateCity[i],
                          }
                          const patch_result = await patchExperience(params, updateId[i]);
                          if (patch_result === 0) {
                            window.location.reload();
                          }
                          handleClose();
                        }}>Enregistrer</Button>
                    </Modal.Footer>
                </Modal>
              </Col>
            </Row>
            </div>
          );
        }
        console.log(arrExperience);
      }
    }
    fetchExperience();
  }, []);

  return (
    <>
    <CreateExperience />

    <Container className="profile__experiences">
      <Row>
        <Col md={4}>
          <h3 style={{fontWeight: 'normal', marginTop: 15}}>Expériences</h3>
        </Col>
      </Row>
      <br/>

      {arrExperience}

    </Container>
    </>
  );
}

function CreateExperience() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [City, setCity] = useState("");
  const [Position, setPosition] = useState("");
  const [Company, setCompany] = useState("");
  var addExperience : Experience = { id: "", position : "", company : "", city: "" };

  return (
    <Row>
      <Col md={12} className="centered__buttons">
        <Button variant="success" style={{marginTop: 10, marginBottom: 10}} onClick={handleShow}>Ajouter une expérience</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter une expérience</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicPosition">
                <Form.Label>Poste</Form.Label>
                <Form.Control type="text" placeholder=" Entrer ici ..." value={Position} onChange={e => { addExperience.position = e.target.value; setPosition(e.target.value)}}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCompany">
                <Form.Label>Entreprise</Form.Label>
                <Form.Control type="text" placeholder="Entrer ici ..." value={Company} onChange={e => { addExperience.company = e.target.value; setCompany(e.target.value)}}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="fo rmBasicLocation">
                <Form.Label>Ville</Form.Label>
                <Form.Control type="text" placeholder="Entrer ici ..." value={City} onChange={e => { addExperience.city = e.target.value; setCity(e.target.value)}}/>
              </Form.Group>
            </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>Annuler</Button>
                <Button variant="primary" onClick={ async () => {
                  const params = {
                    position: Position,
                    company: Company,
                    city: City,
                  };
                  const result = await postExperience(params);
                  if (result === 0) {
                    handleClose();
                    window.location.reload();
                  }
                }}>Ajouter l'expérience</Button>
            </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
}

function CompetencesList() {
  useEffect(() => {
    async function fetchCompetence() {
      const result = await getCompetence();
      
      if (result.id.length > 0) {
        for(let i = 0; i < result.id.length; i++) {
          arrCompetence.push(
            <div key={result.id[i]}>
              <Row>
                <Col md={11}>
                  <br/>
                  <a>{result.competence[i]}</a>
                  <br/>
                </Col>
                <Col md={1} style={{alignItems: 'flex-end'}}>
                  <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={ async () => {
                    const del_result = await deleteCompetence(result.id[i]);
                    if (del_result === 0) {
                      window.location.reload();
                    }
                  }}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
                </Col>
              </Row>
            </div>
          );
        }
        console.log(arrCompetence);
      }
    }
    fetchCompetence();
  }, []);

  return (
    <>
    <Container className="profile__competences">
      <Row>
        <Col md={11}>
          <h3 style={{fontWeight: 'normal', marginTop: 15}}>Compétences</h3>
        </Col>
        <Col md={1} style={{alignItems: 'flex-end', marginTop: 10}}>
          <CreateCompetence/>   
        </Col>
      </Row>
      <br/>
      <Divider />

      {arrCompetence}

    </Container>
    </>
  );
}

function CreateCompetence() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Competence, setCompetence] = useState("");
  var addCompetence : Competence = { id: "", competence: "" };

  return (
    <>
    <Button variant="danger" onClick={handleShow}><FontAwesomeIcon icon={faPen} style={{color: 'white'}}/></Button>
    
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Compétences</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Ajouter une compétence"
              aria-label="Ajouter une compétence"
              aria-describedby="basic-addon1" value={Competence} onChange={e => { addCompetence.competence = e.target.value; setCompetence(e.target.value)}}
            />
            <Button variant="secondary" onClick={ async () => {
              const params = {
                name: Competence
              }
              const result = await postCompetence(params);
            }}>
            <FontAwesomeIcon icon={faPlus} style={{color: 'white'}}/>
            </Button>
          </InputGroup>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={ () => {
          handleClose();
          window.location.reload();
        }}>Fermer</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default Profile;