import '../../App.css';
import { useEffect, useState } from 'react';
import { Container, Col, Row, Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import Divider from "@material-ui/core/Divider";
import axios from 'axios';
import NavbarLogged from '../../components/navbar_logged';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

var userId : string = "";

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
  const [id, setId] = useState("");
  let company = { name: "", domain: "", adress: "", nb_employees: 0 };

  const [tempName, setTName] = useState("");
  const [tempDomain, setTDomain] = useState("");
  const [tempAdress, setTAdress] = useState("");

  const [change, setChange] = useState(false);
  const handleChangeF = () => setChange(false);
  const handleChangeT = () => setChange(true);

  const [actualName, setPName] = useState("");
  const [actualDomain, setPDomain] = useState("");
  const [actualAdress, setPAdress] = useState("");

  const [employee, setEmployeeId] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8000/users/me/companies`, { withCredentials: true })
    .then(res => {
      console.log(res);
      if (res.data) {
        setPName(res.data[0].name);
        setPDomain(res.data[0].domain);
        setPAdress(res.data[0].adress);
        setTName(res.data[0].name);
        setTDomain(res.data[0].domain);
        setTAdress(res.data[0].adress);
        userId = res.data[0].userId;
        setId(res.data[0].id);
      }
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
                    adress: adress,
                  }
                  const url : string = "http://localhost:8000/users/me/companies";
                  axios.post(url, params, { withCredentials: true })
                    .then(res => {
                      console.log(res);
                      setPName(res.data.name);
                      setPDomain(res.data.domain);
                      setPAdress(res.data.adress);
                      alert("L'entreprise " + res.data.name + " a bien été créée !");
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
                  handleCloseAdd();
                }}>Ajouter l'entreprise</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
      <Container className="companies__my">
        <Row>
          <Col md={4}>
            <h3 style={{fontWeight: 'normal', marginTop: 15}}>Mes entreprises</h3>
          </Col>
        </Row>
        <br/>

        {/* Fetch the companies and generate the rows */}
        <Divider />
        <br/>
        <Row>
          <Col md={11}>
            <a style={{fontWeight: 'bold', fontSize: 23}}>{actualName}</a>
            <br/>
            <a style={{opacity: 0.7, fontSize: 20}}>{actualDomain}</a>
            <br/>
            <a>{actualAdress}</a>
          </Col>
          <Col md={1} style={{alignItems: 'flex-end'}}>
            <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={() => {
              axios.get(`http://localhost:8000/users/me/companies/` + id + `/employees`, { withCredentials: true })
              .then(res => {
                console.log(res);
                if (res.data) {
                  setEmployeeId(res.data[0].id);
                }
              })
              .catch(function (error) {
                if (error.response) {
                  console.log(error.response.data.error.message);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                  alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
                }})
              handleShow();
            }}><FontAwesomeIcon icon={faPen} style={{color: 'white'}}/></Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Entreprise X</Modal.Title>
              </Modal.Header>
              <Modal.Body>

              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nom de l'entreprise</Form.Label>
                  <Form.Control type="text" placeholder=" Entrer ici ..." value={tempName} onChange={e => { company.name = e.target.value; setTName(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Domaine</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..." value={tempDomain} onChange={e => { company.domain = e.target.value; setTDomain(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPosition">
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control type="text" placeholder="Entrer ici ..." value={tempAdress} onChange={e => { company.adress = e.target.value; setTAdress(e.target.value)}} />
                </Form.Group>
                <br/>
                <Divider/>
                <br/>
                <Row>
                  <a style={{fontSize: 20, fontWeight: 'bold'}}>Employés</a>
                </Row>
                <br/>
                <Form>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Ajouter un employé"
                      aria-label="Ajouter un employé"
                      aria-describedby="basic-addon1"
                    />
                    <Button variant="secondary" onClick={() => {
                        const params = {
                          user: userId, //pas le bon id c est celui du user pas de l employé
                          company: id,
                        }
                        const url : string = "http://localhost:8000/users/me/companies/" + id + "/employees";
                        axios.post(url, params, { withCredentials: true })
                          .then(res => {
                            console.log(res);
                            window.location.reload();
                          })
                          .catch(function (error) {
                            if (error.response) {
                              console.log(error.response.data.error.message);
                              console.log(error.response.status);
                              console.log(error.response.headers);
                              alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
                            }})
                        handleCloseAdd();
                      }}>
                      <FontAwesomeIcon icon={faPlus} style={{color: 'white'}}/>
                    </Button>
                  </InputGroup>
                </Form>

                {/* Fetch employees of the companies and gen rows */}
                <Row>
                  <Col sm={8}>
                  <input
                  type="text"
                  value="Joseph Todi"
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
                  value="Orlando Touktouk"
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
                  value="Risitas Paelleras"
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
                  <Button variant="danger" onClick={() => {
                    const url : string = "http://localhost:8000/users/me/companies/" + id;
                    axios.delete(url, { withCredentials: true })
                      .then(res => {
                        console.log(res);
                        alert("L'entreprise " + res.data.name + " a été supprimée !");
                        if (change === false) {
                          handleChangeT();
                        }
                        else {
                          handleChangeF();
                        }
                        handleClose();
                        window.location.reload();
                      })
                      .catch(function (error) {
                        if (error.response) {
                          console.log(error.response.data.error.message);
                          console.log(error.response.status);
                          console.log(error.response.headers);
                          alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
                        }})
                  }}>Supprimer l'entreprise</Button>
                  <Button variant="primary" onClick={() => {
                    const params = {
                      name: tempName,
                      domain: tempDomain,
                      adress: tempAdress,
                    }
                    const url : string = "http://localhost:8000/users/me/companies/" + id;
                    axios.patch(url, params, { withCredentials: true })
                      .then(res => {
                        console.log(res);
                        alert("L'entreprise " + res.data.name + " a été mise à jour !");
                        window.location.reload();
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
                    handleClose();
                  }}>Enregistrer</Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <br/>
      </Container>
    </>
  );
}

export default Companies;