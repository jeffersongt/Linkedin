import '../../App.css';
import { Container, Button,
   Image, Col, Row, Modal, Form } from 'react-bootstrap';
import NavbarLogged from '../../components/navbar_logged';
import { UpdateExperiences, UpdateCompetences, AddExperience } from '../exports';
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { signout, deleteAccount } from '../exports';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { profileInfos } from '../../helper/types';
import { faPen } from '@fortawesome/free-solid-svg-icons'

var action : boolean = true;
var profileId : string = "";
var first_name : string = "";
var last_name : string = "";
var city: string = "";
var position: string = "";
var company: string = "";

function Profile() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  
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
    <PersonalInfos/>
    
    {/* Add experience */}
    <Row>
      <Col md={12} className="centered__buttons">
        <AddExperience/>
      </Col>
    </Row>
    
    <ExperiencesList/>
    <CompetencesList/>
    
    <Row>
      <Col md={12} className="centered__buttons">
        <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={signout}>Déconnexion</Button>
      </Col>
    </Row>

    <Row>
      <Col md={12} className="centered__buttons">
          <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={deleteAccount}>Supprimer le compte</Button>
      </Col>
    </Row>
    </>
  );
}

function PersonalInfos() {
  const [actualFName, setFName] = useState("");
  const [actualLName, setLName] = useState("");
  const [actualCity, setCity] = useState("");
  const [actualPosition, setPosition] = useState("");
  const [actualCompany, setCompany] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [tempFName, setTFName] = useState(actualFName);
  const [tempLName, setTLName] = useState(actualLName);
  const [tempCity, setTCity] = useState(actualCity);
  const [tempPosition, setTPosition] = useState(actualPosition);
  const [tempCompany, setTCompany] = useState(actualCompany);

  let form : profileInfos = {first_name : "", last_name : "", city: "", position: "", company: ""};

  useEffect(() => {
    axios.get(`http://localhost:8000/users/me/profiles`, { withCredentials: true })
    .then(res => {
      console.log(res);
      setFName(res.data[0].fst_name);
      setLName(res.data[0].last_name);
      setCity(res.data[0].city);
      setPosition(res.data[0].position);
      setCompany(res.data[0].company);
      profileId = res.data[0].id;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
  }, [action]);
  
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
                  <Form.Control type="text" placeholder=" Entrer ici ..." value={tempFName} onChange={e => { form.first_name = e.target.value; setTFName(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..."  value={tempLName} onChange={e => { form.last_name = e.target.value; setTLName(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPosition">
                  <Form.Label>Poste actuel</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..." value={tempPosition} onChange={e => { form.position = e.target.value; setTPosition(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCity">
                  <Form.Label>Entreprise</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..." value={tempCompany} onChange={e => { form.company = e.target.value; setTCompany(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCity">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..." value={tempCity} onChange={e => { form.city = e.target.value; setTCity(e.target.value)}} />
                </Form.Group>

              </Form>
              </Modal.Body>

              <Modal.Footer>
                  <Button variant="danger" onClick={handleClose}>Annuler</Button>
                  <Button variant="primary" onClick={() => {
                    const params = {
                      fst_name: tempFName,
                      last_name: tempLName,
                      city: tempCity,
                      position: tempPosition,
                      company: tempCompany,
                    }
                    const url : string = "http://localhost:8000/users/me/profiles/" + profileId;
                    axios.patch(url, params, { withCredentials: true })
                    .then(res => {
                      console.log(res);
                      console.log(res.data);
                      alert("ok");
                    })
                    .catch(function (error) {
                      if (error.response) {
                        console.log(error.response.data.error.message);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
                      }})
                  }}>Enregistrer</Button>
              </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <br/>
      <Divider/>
      <br/>
      <Row>
        <Col md={11} className="profile__infos__content">
          <Image style={{ width: '20%', marginTop: 5}} src="https://cdn.futura-sciences.com/buildsv6/images/mediumoriginal/1/6/4/1642c0dc85_50184905_bored-ape-yatch-club-2344.jpg" roundedCircle />
          <br/>
          <a style={{fontWeight: 'bold', fontSize: 28}}>{actualFName} {actualLName}</a>
          <br/>
          <a style={{opacity: 0.9, fontSize: 20}}>{actualPosition}</a>
          <br/>
          <a style={{opacity: 0.9, fontSize: 20}}>{actualCompany}</a>
          <br/>
          <a style={{opacity: 0.7, fontSize: 17}}>{actualCity}</a>
        </Col>
      </Row>
    </Container>
    </>
  );
}

function UpdateInfos() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [actualFName, setFName] = useState("");
  const [actualLName, setLName] = useState("");
  const [actualCity, setCity] = useState("");
  const [actualPosition, setPosition] = useState("");
  const [actualCompany, setCompany] = useState("");
  let form : profileInfos = {first_name : "", last_name : "", city: "", position: "", company: ""};

  return (
      <>
      <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={handleShow}><FontAwesomeIcon icon={faPen} style={{color: 'white'}}/></Button>

      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Informations personnelles</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Prénom</Form.Label>
              <Form.Control type="text" placeholder=" Entrer ici ..." value={actualFName} onChange={e => { form.first_name = e.target.value; setFName(e.target.value)}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" placeholder="Entrer ici ..."  value={actualLName} onChange={e => { form.last_name = e.target.value; setLName(e.target.value)}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPosition">
              <Form.Label>Poste actuel</Form.Label>
              <Form.Control type="text" placeholder="Entrer ici ..." value={actualPosition} onChange={e => { form.position = e.target.value; setPosition(e.target.value)}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>Entreprise</Form.Label>
              <Form.Control type="text" placeholder="Entrer ici ..." value={actualCompany} onChange={e => { form.company = e.target.value; setCompany(e.target.value)}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Label>Ville</Form.Label>
              <Form.Control type="text" placeholder="Entrer ici ..." value={actualCity} onChange={e => { form.city = e.target.value; setCity(e.target.value)}} />
            </Form.Group>

          </Form>
          </Modal.Body>

          <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>Annuler</Button>
              <Button variant="primary" onClick={() => {
                const params = {
                  fst_name: actualFName,
                  last_name: actualLName,
                  city: actualCity,
                  position: actualPosition,
                  company: actualCompany,
                }
                const url : string = "http://localhost:8000/users/me/profiles/" + profileId;
                axios.patch(url, params, { withCredentials: true })
                .then(res => {
                  console.log(res);
                  console.log(res.data);
                  alert("ok");
                })
                .catch(function (error) {
                  if (error.response) {
                    console.log(error.response.data.error.message);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
                  }})
              }}>Enregistrer</Button>
          </Modal.Footer>
      </Modal>
      </>
  );
}

function ExperiencesList() {
  return (
    <>
    <Container className="profile__experiences">
      <Row>
        <Col md={4}>
          <h3 style={{fontWeight: 'normal', marginTop: 15}}>Expériences</h3>
        </Col>
      </Row>
      <br/>

      {/* Fetch the experiences and generate the rows */}
      <Divider />
      <br/>
      <Row>
        <Col md={11}>
          <a style={{fontWeight: 'bold', fontSize: 23}}>Développeur web</a>
          <br/>
          <a style={{opacity: 0.7, fontSize: 18}}>Jestimo</a>
          <br/>
          <a>Du <a style={{fontWeight: 'bold'}}>01/09/2021</a> jusqu'à <a style={{fontWeight: 'bold'}}>Aujourd'hui</a></a>
          <br/>
          <a>Paris</a>
        </Col>
        <Col md={1} style={{alignItems: 'flex-end'}}>
            <UpdateExperiences/>
        </Col>
      </Row>
      <br/>

      <Divider />
      <br/>
      <Row>
        <Col md={11}>
          <a style={{fontWeight: 'bold', fontSize: 23}}>Data analyst</a>
          <br/>
          <a style={{opacity: 0.7}}>SFR</a>
          <br/>
          <a>Du <a style={{fontWeight: 'bold'}}>01/09/2020</a> jusqu'à <a style={{fontWeight: 'bold'}}>31/12/2020</a></a>
          <br/>
          <a>Issy-les-moulineaux</a>
        </Col>
        <Col md={1} style={{alignItems: 'flex-end'}}>
            <UpdateExperiences/>
        </Col>
      </Row>
      <br/>
    </Container>
    </>
  );
}

function CompetencesList() {
  return (
    <>
    <Container className="profile__competences">
      <Row>
        <Col md={11}>
          <h3 style={{fontWeight: 'normal', marginTop: 15}}>Compétences</h3>
        </Col>
        <Col md={1} style={{alignItems: 'flex-end', marginTop: 10}}>
            <UpdateCompetences/>
        </Col>
      </Row>
      <br/>
      <Divider />

      <Row>
        <Col md={11}>
          <br/>
          <a style={{fontWeight: 'bold', fontSize: 20}}><FontAwesomeIcon icon={faThumbtack} style={{color: 'black'}}/> Epinglées</a>
          <br/>
          <a>C</a>
          <br/>
          <a>English</a>
          <br/>
          <a>PHP</a>
          <br/>
          <br/>
          <Divider />
          <br/>
          <a>Python</a>
          <br/>
          <a>JS</a>
          <br/>
          <a>TS</a>
          <br/>
          <a>Flask</a>
          <br/>
          <a>Rust</a>
          <br/>
          <a>Bootstrap</a>
          <br/>
          <a>Unix</a>
          <br/>
          <br/>
        </Col>
       
      </Row>
    </Container>
    </>
  );
}

export default Profile;