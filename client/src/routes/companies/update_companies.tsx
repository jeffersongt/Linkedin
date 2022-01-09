import { Button, Modal, Form, Col, Row, InputGroup, FormControl, ToggleButton } from 'react-bootstrap';
import { useState } from 'react';
import { deleteCompany, addCompany, updateCompany, addEmployee, deleteEmployee, } from "../exports";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { Divider } from '@material-ui/core';

function UpdateCompany() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={handleShow}><FontAwesomeIcon icon={faPen} style={{color: 'white'}}/></Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Entreprise X</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nom de l'entreprise</Form.Label>
          <Form.Control type="text" placeholder=" Entrer ici ..." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Domaine</Form.Label>
          <Form.Control type="text" placeholder="Entrer ici ..." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPosition">
          <Form.Label>Adresse</Form.Label>
          <Form.Control type="text" placeholder="Entrer ici ..." />
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
            <Button variant="secondary" onClick={addEmployee}>
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
          <Button variant="danger" style={{marginBottom: 5}} onClick={deleteEmployee}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
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
          <Button variant="danger" style={{marginBottom: 5}} onClick={deleteEmployee}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
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
          <Button variant="danger" style={{marginBottom: 5}} onClick={deleteEmployee}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
          </Col>
        </Row>

      </Form>
      </Modal.Body>

      <Modal.Footer>
          <Button variant="danger" onClick={deleteCompany}>Supprimer l'entreprise</Button>
          <Button variant="primary" onClick={updateCompany}>Enregistrer</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}


function AddCompany() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Button variant="success" style={{marginTop: 10, marginBottom: 10}} onClick={handleShow}>Ajouter une entreprise</Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Entreprise X</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nom de l'entreprise</Form.Label>
          <Form.Control type="text" placeholder=" Entrer ici ..." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Domaine</Form.Label>
          <Form.Control type="text" placeholder="Entrer ici ..." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPosition">
          <Form.Label>Adresse</Form.Label>
          <Form.Control type="text" placeholder="Entrer ici ..." />
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
            <Button variant="secondary">
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
          <Button variant="danger" style={{marginBottom: 5}}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
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
          <Button variant="danger" style={{marginBottom: 5}}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
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
          <Button variant="danger" style={{marginBottom: 5}}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
          </Col>
        </Row>

      </Form>
      </Modal.Body>

      <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" onClick={addCompany}>Ajouter l'entreprise</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export {
  UpdateCompany,
  AddCompany
}