import '../../App.css';
import { Container, Button,
   Image, Col, Row, Modal, Form, InputGroup, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router';

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
  let navigate = useNavigate();

  return (
    <>
    <PersonalInfosGetUpdate/>
    <ExperiencesGet/>
    <CompetencesList/>
    
    <Row>
      <Col md={12} className="centered__buttons">
        <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={ async () => {
          const result = await signout();
          if (result === 0) {
            navigate("/");
          }
        }}>Déconnexion</Button>
      </Col>
    </Row>
    <Row>
      <Col md={12} className="centered__buttons">
          <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={ async () => {
            const result = await deleteAccount();
            if (result === 0) {
              navigate("/");
            }
          }}>Supprimer le compte</Button>
      </Col>
    </Row>
    </>
  );
}

function PersonalInfosGetUpdate() {
  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateFirstName, setUpdateFirstName] = useState("");
  const [updateLastName, setUpdateLastName] = useState("");
  const [updateCity, setUpdateCity] = useState("");
  const [updatePosition, setUpdatePosition] = useState("");
  const [updateCompany, setUpdateCompany] = useState("");
  var updateInfos : Infos = {first_name: "", last_name: "", city: "", position: "", company: "", id: ""};

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
        setUpdateFirstName(result.first_name);
        setUpdateLastName(result.last_name);
        setUpdateCity(result.city);
        setUpdatePosition(result.position);
        setUpdateCompany(result.company);
      }
      else if (result.id === "") {
        navigate("/");
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
                  <Form.Control type="text" placeholder=" Entrer ici ..." value={updateFirstName} onChange={e => { updateInfos.first_name = e.target.value; setUpdateFirstName(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..."  value={updateLastName} onChange={e => { updateInfos.last_name = e.target.value; setUpdateLastName(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPosition">
                  <Form.Label>Poste actuel</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..." value={updatePosition} onChange={e => { updateInfos.position = e.target.value; setUpdatePosition(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCity">
                  <Form.Label>Entreprise</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..." value={updateCompany} onChange={e => { updateInfos.company = e.target.value; setUpdateCompany(e.target.value)}} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCity">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..." value={updateCity} onChange={e => { updateInfos.city = e.target.value; setUpdateCity(e.target.value)}} />
                </Form.Group>
              </Form>
              </Modal.Body>

              <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>Annuler</Button>
                  <Button variant="primary" onClick={ async () => {
                    const params = {
                      fst_name: updateFirstName,
                      last_name: updateLastName,
                      city: updateCity,
                      position: updatePosition,
                      company: updateCompany,
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
        <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="button-tooltip-2">Ceci est votre id unique personnel, communiquez le à votre employeur pour être ajouté à votre entreprise</Tooltip>} children={
        <a style={{opacity: 0.8, fontSize: 16}}>{profile.id}</a>
        }></OverlayTrigger>
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

function UpdateExperiences(props : { id : string, position : string, company : string, city : string}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateCity, setUpdateCity] = useState(props.city);
  const [updatePosition, setUpdatePosition] = useState(props.position);
  const [updateCompany, setUpdateCompany] = useState(props.company);
  var updateExperience : Experience = { id: "", position : "", company : "", city: "" };

  return (
    <>
    <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={ () => {
      handleShow();
    }}><FontAwesomeIcon icon={faPen} style={{color: 'white'}}/></Button>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Expérience {props.id}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPosition">
            <Form.Label>Poste</Form.Label>
            <Form.Control type="text" placeholder=" Entrer ici ..." value={updatePosition} onChange={e => { updateExperience.position = e.target.value; setUpdatePosition(e.target.value)}}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCompany">
            <Form.Label>Entreprise</Form.Label>
            <Form.Control type="text" placeholder="Entrer ici ..." value={updateCompany} onChange={e => { updateExperience.company = e.target.value; setUpdateCompany(e.target.value)}}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="fo rmBasicLocation">
            <Form.Label>Ville</Form.Label>
            <Form.Control type="text" placeholder="Entrer ici ..." value={updateCity} onChange={e => { updateExperience.city = e.target.value; setUpdateCity(e.target.value)}}/>
          </Form.Group>
        </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="danger" onClick={ async () => {
              const del_result = await deleteExperience(props.id);
              if (del_result === 0) {
                window.location.reload();
              }
              handleClose();
            }}>Supprimer l'expérience</Button>
            <Button variant="primary" onClick={ async () => {
              const params = {
                position : updatePosition,
                company : updateCompany,
                city : updateCity,
              }
              const patch_result = await patchExperience(params, props.id);
              if (patch_result === 0) {
                window.location.reload();
              }
              handleClose();
            }}>Enregistrer</Button>
        </Modal.Footer>
    </Modal>
    </>
  );
}
 
function ExperiencesGet() {
  const [Experiences, setExperiences] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    async function fetchExperience() {
      const result = await getExperience();

      if (result.id.length > 0) {
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
                <UpdateExperiences id={result.id[i]} position={result.position[i]} company={result.company[i]} city={result.city[i]} />
              </Col>
            </Row>
            </div>
          );
        }
        setExperiences(arrExperience);
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

      {Experiences}

      <br/>
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
  const [Competences, setCompetences] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    async function fetchCompetence() {
      const result = await getCompetence();
      
      if (result.id.length > 0) {
        for(let i = 0; i < result.id.length; i++) {
          arrCompetence.push(
            <div key={result.id[i]}>
              <Divider/>
                <Row>
                <Col md={11}>
                  <br/>
                  <a style={{display: 'flex', alignItems: 'center', fontSize: 20}}>{result.competence[i]}</a>
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
        setCompetences(arrCompetence);
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
      <br/>

      {Competences}

      <br/>
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
              await postCompetence(params);
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