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
import { signout, deleteAccount } from '../exports';
import { profileInfos, profileExperience } from '../../helper/types';

var profileId : string = "";

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
    <ProfileExperiences/>
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

  const [tempFName, setTFName] = useState("");
  const [tempLName, setTLName] = useState("");
  const [tempCity, setTCity] = useState("");
  const [tempPosition, setTPosition] = useState("");
  const [tempCompany, setTCompany] = useState("");

  const [change, setChange] = useState(false);
  const handleChangeF = () => setChange(false);
  const handleChangeT = () => setChange(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      setTFName(res.data[0].fst_name);
      setTLName(res.data[0].last_name);
      setTCity(res.data[0].city);
      setTPosition(res.data[0].position);
      setTCompany(res.data[0].company);
      profileId = res.data[0].id;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
  }, [change]);
  
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
                      alert("Votre profil a été mis à jour avec succès !");
                      handleClose();
                      if (change === false) {
                        handleChangeT();
                      }
                      else {
                        handleChangeF();
                      }
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

function ProfileExperiences() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [change, setChange] = useState(false);
  const handleChangeF = () => setChange(false);
  const handleChangeT = () => setChange(true);

  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const [actualCityAdd, setCityAdd] = useState("");
  const [actualPositionAdd, setPositionAdd] = useState("");
  const [actualCompanyAdd, setCompanyAdd] = useState("");
  let formAdd : profileExperience = {position : "", company : "", start_date: new Date(), end_date: new Date(), location: ""};

  const [actualCity, setCity] = useState("");
  const [actualPosition, setPosition] = useState("");
  const [actualCompany, setCompany] = useState("");
  let form : profileExperience = {position : "", company : "", start_date: new Date(), end_date: new Date(), location: ""};

  const [City, setACity] = useState("");
  const [Position, setAPosition] = useState("");
  const [Company, setACompany] = useState("");
  const [Id, setAId] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8000/users/me/experiences`, { withCredentials: true })
    .then(res => {
      console.log(res);
      for(let i = 0; i < res.data.length; i++) {
        setACompany(res.data[i].company);
        setAPosition(res.data[i].position);
        setACity(res.data[i].city);
        setAId(res.data[i].id);
        setCompany(res.data[i].company);
        setPosition(res.data[i].position);
        setCity(res.data[i].city);
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      }})
  }, [change]);

  return (
    <>
    <Row>
      <Col md={12} className="centered__buttons">
        <Button variant="success" style={{marginTop: 10, marginBottom: 10}} onClick={handleShowAdd}>Ajouter une expérience</Button>
        <Modal show={showAdd} onHide={handleCloseAdd}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter une expérience</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicPosition">
                <Form.Label>Poste</Form.Label>
                <Form.Control type="text" placeholder=" Entrer ici ..." value={actualPositionAdd} onChange={e => { formAdd.position = e.target.value; setPositionAdd(e.target.value)}}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCompany">
                <Form.Label>Entreprise</Form.Label>
                <Form.Control type="text" placeholder="Entrer ici ..." value={actualCompanyAdd} onChange={e => { formAdd.company = e.target.value; setCompanyAdd(e.target.value)}}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="fo rmBasicLocation">
                <Form.Label>Ville</Form.Label>
                <Form.Control type="text" placeholder="Entrer ici ..." value={actualCityAdd} onChange={e => { formAdd.location = e.target.value; setCityAdd(e.target.value)}}/>
              </Form.Group>
            </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleCloseAdd}>Annuler</Button>
                <Button variant="primary" onClick={ () => {
                  const params = {
                    position: actualPositionAdd,
                    company: actualCompanyAdd,
                    city: actualCityAdd,
                  };
                  axios.post(`http://localhost:8000/users/me/experiences`, params, { withCredentials: true })
                  .then(res => {
                    console.log(res);
                    console.log(res.data);
                    alert("L'expérience " + res.data.position + " a été ajoutée avec succès !");
                  })
                  .catch(function (error) {
                    if (error.response) {
                      console.log(error.response.data.error.message);
                      console.log(error.response.status);
                      console.log(error.response.headers);
                      alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
                  }})
                  if (change === false) {
                    handleChangeT();
                  }
                  else {
                    handleChangeF();
                  }
                  window.location.reload();
                  handleCloseAdd();
                }}>Ajouter l'expérience</Button>
            </Modal.Footer>
        </Modal>
      </Col>
    </Row>
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
          <a style={{fontWeight: 'bold', fontSize: 23}}>{Position}</a>
          <br/>
          <a style={{opacity: 0.7, fontSize: 18}}>{Company}</a>
          <br/>
          <a>{City}</a>
        </Col>
        <Col md={1} style={{alignItems: 'flex-end'}}>
          <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={handleShow}><FontAwesomeIcon icon={faPen} style={{color: 'white'}}/></Button>

          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Expérience X</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              
              <Form>
                <Form.Group className="mb-3" controlId="formBasicPosition">
                  <Form.Label>Poste</Form.Label>
                  <Form.Control type="text" placeholder=" Entrer ici ..." value={actualPosition} onChange={e => { form.position = e.target.value; setPosition(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCompany">
                  <Form.Label>Entreprise</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..." value={actualCompany} onChange={e => { form.company = e.target.value; setCompany(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLocation">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..." value={actualCity} onChange={e => { form.location = e.target.value; setCity(e.target.value)}} />
                </Form.Group>
              </Form>

              </Modal.Body>
              <Modal.Footer>
                  <Button variant="danger" onClick={ () => {
                    const params = {
                      position: actualPosition,
                      company: actualCompany,
                      city: actualCity,
                    }
                    const url : string = "http://localhost:8000/users/me/experiences/" + Id;
                    axios.delete(url, { withCredentials: true })
                      .then(res => {
                        console.log(res);
                        alert("L'expérience a été supprimée avec succès !");
                        setCity("");
                        setPosition("");
                        setCity("");
                        window.location.reload();
                      })
                      .catch(function (error) {
                        if (error.response) {
                          console.log(error.response.data.error.message);
                          console.log(error.response.status);
                          console.log(error.response.headers);
                          alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
                          setCity("");
                          setPosition("");
                          setCity("");
                        }})
                    if (change === false) {
                      handleChangeT();
                    }
                    else {
                      handleChangeF();
                    }
                    handleClose();
                  }}>Supprimer l'expérience</Button>
                  <Button variant="primary" onClick={ () => {
                    const params = {
                      position: actualPosition,
                      company: actualCompany,
                      city: actualCity,
                    }
                    const url : string = "http://localhost:8000/users/me/experiences/" + Id;
                    axios.patch(url, params, { withCredentials: true })
                      .then(res => {
                        console.log(res);
                        alert("L'expérience " + res.data.position + " a été mise à jour !");
                        setCity("");
                        setPosition("");
                        setCity("");
                        window.location.reload();
                      })
                      .catch(function (error) {
                        if (error.response) {
                          console.log(error.response.data.error.message);
                          console.log(error.response.status);
                          console.log(error.response.headers);
                          alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
                          setCity("");
                          setPosition("");
                          setCity("");
                        }})
                    if (change === false) {
                      handleChangeT();
                    }
                    else {
                      handleChangeF();
                    }
                    handleClose();
                  }}>Enregistrer</Button>
              </Modal.Footer>
          </Modal>
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
        </Col>
      </Row>
      <br/>
    </Container>
    </>
  );
}

function CompetencesList() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [change, setChange] = useState(false);
  const handleChangeF = () => setChange(false);
  const handleChangeT = () => setChange(true);

  const [name, setCompetence] = useState("");
  const [id, setId] = useState("");
  let competence : string = "";
  const [arr, setArr] = useState([] as any);

  useEffect(() => {
    axios.get(`http://localhost:8000/users/me/competences`, { withCredentials: true })
    .then(res => {
      console.log(res);
      for(let i = 0; i < res.data.length; i++) {
        //console.log(res.data[i].name);
        setCompetence(res.data[i].name);
        setId(res.data[i].id);
        //var domElement : JSX.Element = <p key={id}>{name}</p>
        //setArr(res.data[i].name);
        //console.log(arr);
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      }})
  }, [change]);

  // const check = (arr: any[]) => {
  //   if (arr.length > 1) {
  //     return (
  //       arr.map((item, index) => {
  //         return (
  //           <p key={index}>{item}</p>
  //         );
  //       })
  //     );
  //   }
  //   else {
  //     return (<h3>No competence yet</h3>);
  //   }
  // }

  return (
    <>
    <Container className="profile__competences">
      <Row>
        <Col md={11}>
          <h3 style={{fontWeight: 'normal', marginTop: 15}}>Compétences</h3>
        </Col>
        <Col md={1} style={{alignItems: 'flex-end', marginTop: 10}}>
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
                    aria-describedby="basic-addon1" value={name} onChange={e => { competence = e.target.value; setCompetence(e.target.value)}}
                  />
                  <Button variant="secondary" onClick={() => {
                    const params = {
                      name: name
                    }
                    const url : string = "http://localhost:8000/users/me/competences";
                    axios.post(url, params, { withCredentials: true })
                      .then(res => {
                        console.log(res);
                        console.log(res.data);
                        setCompetence("");
                      })
                      .catch(function (error) {
                        if (error.response) {
                          console.log(error.response.data.error.message);
                          console.log(error.response.status);
                          console.log(error.response.headers);
                          alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
                        }})
                  }}>
                  <FontAwesomeIcon icon={faPlus} style={{color: 'white'}}/>
                  </Button>
                </InputGroup>
                {/* Fetch list of competences and gen rows needed */}
                <Row>
                  <Col sm={8}>
                  <input
                    type="text"
                    value="C"
                    style={{textAlign: 'center', marginBottom: 5}}
                    disabled
                  />
                  </Col>
                  <Col sm={4}>
                    <Button variant="danger" style={{marginBottom: 5}} onClick={handleClose}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
                  </Col>
                </Row>
                <Row>
                  <Col sm={8}>
                  <input
                    type="text"
                    value="React"
                    style={{textAlign: 'center', marginBottom: 5}}
                    disabled
                  />
                  </Col>
                  <Col sm={4}>
                    <Button variant="danger" style={{marginBottom: 5}} onClick={handleClose}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
                  </Col>
                </Row>
                <Row>
                  <Col sm={8}>
                  <input
                    type="text"
                    value="Node"
                    style={{textAlign: 'center', marginBottom: 5}}
                    disabled
                  />
                  </Col>
                  <Col sm={4}>
                    <Button variant="danger" style={{marginBottom: 5}} onClick={handleClose}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
                  </Col>
                </Row>
              </Form>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={ () => {
                  if (change === false) {
                    handleChangeT();
                  }
                  else {
                    handleChangeF();
                  }
                  handleClose();
                }}>Fermer</Button>
              </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <br/>
      <Divider />
      {/* Dois gen une row par competence */}
      {/* {arr.map((item: {} | null | undefined) => <li>{item}</li>)} */}
      <Row>
        <Col md={11}>
          <br/>
          <p key={id}>{name}</p>
          <br/>
        </Col>
        <Col md={1} style={{alignItems: 'flex-end'}}>
          <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick = {() => {
            axios.delete(`http://localhost:8000/users/me/competences/` + id, { withCredentials: true })
              .then(res => {
                console.log(res);
                window.location.reload();
              })
              .catch(function (error) {
                if (error.response) {
                  console.log(error.response.data.error.message);
                  console.log(error.response.status);
                  console.log(error.response.headers);
              }})
            if (change === false) {
              handleChangeT();
            }
            else {
              handleChangeF();
            }
            
          }}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
        </Col>
      </Row>

    </Container>
    </>
  );
}

export default Profile;