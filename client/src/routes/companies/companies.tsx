import '../../App.css';
import { useEffect, useState } from 'react';
import { Container, Col, Row, Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

import NavbarLogged from '../../components/navbar_logged';
import { getCompany, postCompany, patchCompany, deleteCompany,
  getEmployee, postEmployee, deleteEmployee } from '../exports';
import { Company, Companies } from '../../helper/types';

var arrCompany : JSX.Element[] = [];

function CompaniesComponent() {
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var updateId : string[] = [];
  var updateName : string[] = [];
  var updateDomain : string[] = [];
  var updateAdress : string[] = [];
  var updateCompany : Company = { id: "", name : "", domain : "", adress: "" };

  useEffect(() => {
    async function fetchCompany() {
      const result = await getCompany();
      
      if (result.id.length > 0) {
        updateId = result.id;
        updateName = result.name;
        updateDomain = result.domain;
        updateAdress = result.adress;
        for(let i = 0; i < result.id.length; i++) {
          arrCompany.push(
            <div key={result.id[i]}>
              <Divider />
              <br/>
              <Row>
                <Col md={11}>
                  <a style={{fontWeight: 'bold', fontSize: 23}}>{result.name[i]}</a>
                  <br/>
                  <a style={{opacity: 0.7, fontSize: 20}}>{result.domain[i]}</a>
                  <br/>
                  <a>{result.adress[i]}</a>
                </Col>
                <Col md={1} style={{alignItems: 'flex-end'}}>
                  <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={() => {
                    // axios.get(`http://localhost:8000/users/me/companies/` + id + `/employees`, { withCredentials: true })
                    // .then(res => {
                    //   console.log(res);
                    //   if (res.data) {
                    //     setEmployeeId(res.data[0].id);
                    //   }
                    // })
                    // .catch(function (error) {
                    //   if (error.response) {
                    //     console.log(error.response.data.error.message);
                    //     console.log(error.response.status);
                    //     console.log(error.response.headers);
                    //     alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
                    //   }})
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
                        <Form.Control type="text" placeholder=" Entrer ici ..." value={updateName[i]} onChange={e => { updateCompany.name = e.target.value; updateName[i] = e.target.value}} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Domaine</Form.Label>
                        <Form.Control type="text" placeholder="Entrer ici ..." value={updateDomain[i]} onChange={e => { updateCompany.domain = e.target.value; updateDomain[i] = e.target.value}} />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPosition">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control type="text" placeholder="Entrer ici ..." value={updateAdress[i]} onChange={e => { updateCompany.adress = e.target.value; updateAdress[i] = e.target.value}} />
                      </Form.Group>
                      <br/>
                      <Divider/>
                      <br/>
                      <Row>
                        <a style={{fontSize: 20, fontWeight: 'bold'}}>Employés</a>
                      </Row>
                      <br/>
                      {/* <Form>
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
                              handleClose();
                            }}>
                            <FontAwesomeIcon icon={faPlus} style={{color: 'white'}}/>
                          </Button>
                        </InputGroup>
                      </Form> */}

                      {/* Fetch employees of the companies and gen rows */}
                      {/* <Row>
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
                      </Row> */}

                    </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={ async () => {
                          const del_result = await deleteCompany(updateId[i]);
                          
                          if (del_result === 0) {
                            handleClose();
                            window.location.reload();
                          }
                        }}>Supprimer l'entreprise</Button>
                        <Button variant="primary" onClick={ async () => {
                          const params = {
                            name: updateName[i],
                            domain: updateDomain[i],
                            adress: updateAdress[i],
                          }
                          const patch_result = await patchCompany(params, updateId[i]);

                          if (patch_result === 0) {
                            handleClose();
                            window.location.reload();
                          }
                        }}>Enregistrer</Button>
                    </Modal.Footer>
                  </Modal>
                </Col>
              </Row>
            </div>
          );
        }
      }
      console.log(arrCompany);
    }
    fetchCompany();
  }, []);

  return (
    <>
      <CreateCompany/>

      <Container className="companies__my">
        <Row>
          <Col md={4}>
            <h3 style={{fontWeight: 'normal', marginTop: 15}}>Mes entreprises</h3>
          </Col>
        </Row>
        <br/>

        {arrCompany}
        
        <br/>
      </Container>
    </>
  );
}

function CreateCompany() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Name, setName] = useState("");
  const [Domain, setDomain] = useState("");
  const [Adress, setAdress] = useState("");
  var company : Company = {
    id: "",
    name: "",
    domain: "",
    adress: ""
  };

  return (
    <Row>
      <Col md={12} className="centered__buttons">
        <Button variant="success" style={{marginTop: 10, marginBottom: 10}} onClick={handleShow}>Ajouter une entreprise</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Entreprise X</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nom de l'entreprise</Form.Label>
              <Form.Control type="text" placeholder=" Entrer ici ..." value={Name} onChange={e => { company.name = e.target.value; setName(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Domaine</Form.Label>
              <Form.Control type="text" placeholder="Entrer ici ..." value={Domain} onChange={e => { company.domain = e.target.value; setDomain(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPosition">
              <Form.Label>Adresse</Form.Label>
              <Form.Control type="text" placeholder="Entrer ici ..." value={Adress} onChange={e => { company.adress = e.target.value; setAdress(e.target.value)}}/>
            </Form.Group>
          </Form>

          </Modal.Body>
          <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>Annuler</Button>
              <Button variant="primary" onClick={ async () => {
                const params = {
                  name: Name,
                  domain: Domain,
                  adress: Adress,
                }
                const result = await postCompany(params);

                if (result === 0) {
                  handleClose();
                  window.location.reload();
                }
              }}>Ajouter l'entreprise</Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
}

export default CompaniesComponent;