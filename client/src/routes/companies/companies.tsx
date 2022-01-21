import '../../App.css';
import { useEffect, useState } from 'react';
import { Container, Col, Row, Modal, Button, Form, InputGroup, FormControl, Dropdown } from 'react-bootstrap';
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

import NavbarLogged from '../../components/navbar_logged';
import { getCompany, postCompany, patchCompany, deleteCompany,
  getEmployee, postEmployee, deleteEmployee, searchProfile } from '../exports';
import { Company, Companies } from '../../helper/types';
import { useNavigate } from 'react-router';

var arrCompanies : JSX.Element[] = [];
var arrEmployees : JSX.Element[] = [];

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
        <CompaniesGet/>
    </div>
    </>
  );
}

function CompaniesUpdate(props : { id : string, name : string, domain : string, adress : string}) {
  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); Employees.splice(0, Employees.length); };
  const handleShow = () => setShow(true);

  const [Employees, setEmployees] = useState<Array<JSX.Element>>([]);
  const [AddEmployee, setAddEmployee] = useState("");
  var employee : string = "";

  const [updateName, setUpdateName] = useState(props.name);
  const [updateDomain, setUpdateDomain] = useState(props.domain);
  const [updateAdress, setUpdateAdress] = useState(props.adress);
  var updateCompany : Company = { id: "", name : "", domain : "", adress: "" };

  return (
    <>
    <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={ async () => {
      const result_GetEmployee = await getEmployee(props.id);

      if (result_GetEmployee.id.length > 0) {
        for (let i = 0; i < result_GetEmployee.id.length; i++) {
            arrEmployees.push(<>
            <Row>
              <Col sm={8}>
                <input
                type="text"
                value={result_GetEmployee.userName[i]}
                style={{textAlign: 'center', marginBottom: 5}}
                disabled
                />
              </Col>
              <Col sm={4}>
                <Button variant="danger" style={{marginBottom: 5}} onClick={ async () => {
                  await deleteEmployee(props.id, result_GetEmployee.id[i]);
                  handleClose();
                }}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
              </Col>
            </Row></>);
        }
        setEmployees(arrEmployees);
        console.log(arrEmployees);
      }
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
          <Form.Control type="text" placeholder=" Entrer ici ..." value={updateName} onChange={e => { updateCompany.name = e.target.value; setUpdateName(e.target.value)}} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Domaine</Form.Label>
          <Form.Control type="text" placeholder="Entrer ici ..." value={updateDomain} onChange={e => { updateCompany.domain = e.target.value; setUpdateDomain(e.target.value)}} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPosition">
          <Form.Label>Adresse</Form.Label>
          <Form.Control type="text" placeholder="Entrer ici ..." value={updateAdress} onChange={e => { updateCompany.adress = e.target.value; setUpdateAdress(e.target.value)}} />
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
              placeholder="Ajouter un employé par son ID"
              aria-label="Ajouter un employé par son ID"
              aria-describedby="basic-addon1"
              value={AddEmployee} onChange={e => { employee = e.target.value; setAddEmployee(e.target.value)}}
            />
          <Button variant="secondary" onClick={ async () => {
              const params = {
                user : AddEmployee,
                company : props.id,
              }
              await postEmployee(params, AddEmployee);
              handleClose();
            }}>
            <FontAwesomeIcon icon={faPlus} style={{color: 'white'}}/>
          </Button>
          </InputGroup>
        </Form>

        {Employees}

      </Form>
      </Modal.Body>

      <Modal.Footer>
          <Button variant="danger" onClick={ async () => {
            const del_result = await deleteCompany(props.id);
            
            if (del_result === 0) {
              handleClose();
              window.location.reload();
            }
          }}>Supprimer l'entreprise</Button>
          <Button variant="primary" onClick={ async () => {
            const params = {
              name: updateName,
              domain: updateDomain,
              adress: updateAdress,
            }
            const patch_result = await patchCompany(params, props.id);

            if (patch_result === 0) {
              handleClose();
              window.location.reload();
            }
          }}>Enregistrer</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

function CompaniesGet() {
  let navigate = useNavigate();
  const [Companies, setCompanies] = useState<Array<JSX.Element>>([]);
  
  useEffect(() => {
    async function fetchCompany() {
      const result = await getCompany();
      
      if (result.id[0] === "error") {
        navigate("/");
      }
      if (result.id.length > 0 && result.id[0] !== "error") {
        for(let i = 0; i < result.id.length; i++) {
          arrCompanies.push(
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
                <CompaniesUpdate id={result.id[i]} name={result.name[i]} domain={result.domain[i]} adress={result.adress[i]} />
                </Col>
              </Row>
            </div>
          );
        }
      }
      setCompanies(arrCompanies);
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

        {Companies}
        
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