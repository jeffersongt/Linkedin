import { Button, Modal, Form, Col, Row, InputGroup, FormControl, ToggleButton } from 'react-bootstrap';
import { useState } from 'react';
import { updateProfile, addExperience, deleteExperience, addCompetence, updateExperience, deleteCompetence } from "../exports";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

function UpdateInfos() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                <Form.Control type="text" placeholder=" Entrer ici ..." />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" placeholder="Entrer ici ..." />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPosition">
                <Form.Label>Poste actuel</Form.Label>
                <Form.Control type="text" placeholder="Entrer ici ..." />
              </Form.Group>

              {/* Add autocompletion city with an api */}
              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>Ville</Form.Label>
                <Form.Control type="text" placeholder="Entrer ici ..." />
              </Form.Group>

            </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>Annuler</Button>
                <Button variant="primary" onClick={updateProfile}>Enregistrer</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

function AddExperience() {
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);
  let end_date : JSX.Element = <Col><Form.Label>Date de fin</Form.Label><Form.Control type="text" placeholder="00/00/0000" /></Col>;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (checked === true) {
    end_date = <></>;
    // clear input if there is one
  }

  return (
    <>
    <Button variant="success" style={{marginTop: 10, marginBottom: 10}} onClick={handleShow}>Ajouter une expérience</Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Ajouter une expérience</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPosition">
            <Form.Label>Poste</Form.Label>
            <Form.Control type="text" placeholder=" Entrer ici ..." />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCompany">
            <Form.Label>Entreprise</Form.Label>
            <Form.Control type="text" placeholder="Entrer ici ..." />
          </Form.Group>

          {/* Add calendar for dates */}
          <Row>
              <Col>
                <Form.Label>Date de début</Form.Label>
                <Form.Control type="text" placeholder="00/00/0000" />
              </Col>
              {end_date}
          </Row>

          <Form.Group className="mb-3" id="formGridCheckbox">
            <ToggleButton
              className="mb-2"
              id="toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={checked}
              value="1"
              onChange={(e) => setChecked(e.currentTarget.checked)}
              style={{marginTop: 5}}
            >
              Je suis actuellement employé là-bas
            </ToggleButton>
          </Form.Group>

          {/* Add autocompletion location with an api */}
          <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>Ville</Form.Label>
            <Form.Control type="text" placeholder="Entrer ici ..." />
          </Form.Group>
        </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>Annuler</Button>
            <Button variant="primary" onClick={addExperience}>Ajouter l'expérience</Button>
        </Modal.Footer>
    </Modal>
    </>
  );
}

function UpdateExperiences() {
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let end_date : JSX.Element = <Col><Form.Label>Date de fin</Form.Label><Form.Control type="text" placeholder="00/00/0000" /></Col>;

  if (checked === true) {
    end_date = <></>;
    // clear input if there is one
  }

  return (
    <>
    <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={handleShow}><FontAwesomeIcon icon={faPen} style={{color: 'white'}}/></Button>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Expérience X</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPosition">
            <Form.Label>Poste</Form.Label>
            <Form.Control type="text" placeholder=" Entrer ici ..." />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCompany">
            <Form.Label>Entreprise</Form.Label>
            <Form.Control type="text" placeholder="Entrer ici ..." />
          </Form.Group>

          {/* Add calendar for dates */}
          <Row>
              <Col>
                <Form.Label>Date de début</Form.Label>
                <Form.Control type="text" placeholder="00/00/0000" />
              </Col>
              {end_date}
          </Row>

          <Form.Group className="mb-3" id="formGridCheckbox">
            <ToggleButton
              className="mb-2"
              id="toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={checked}
              value="1"
              onChange={(e) => setChecked(e.currentTarget.checked)}
              style={{marginTop: 5}}
            >
              Je suis actuellement employé là-bas
            </ToggleButton>
          </Form.Group>

          {/* Add autocompletion location with an api */}
          <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>Ville</Form.Label>
            <Form.Control type="text" placeholder="Entrer ici ..." />
          </Form.Group>
        </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="danger" onClick={deleteExperience}>Supprimer l'expérience</Button>
            <Button variant="primary" onClick={updateExperience}>Enregistrer</Button>
        </Modal.Footer>
    </Modal>
    </>
  );
}

function UpdateCompetences() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              aria-describedby="basic-addon1"
            />
            <Button variant="secondary" onClick={addCompetence}>
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
              <Button variant="danger" style={{marginBottom: 5}} onClick={deleteCompetence}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
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
              <Button variant="danger" style={{marginBottom: 5}} onClick={deleteCompetence}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
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
              <Button variant="danger" style={{marginBottom: 5}} onClick={deleteCompetence}><FontAwesomeIcon icon={faWindowClose} style={{color: 'white'}}/></Button>
            </Col>
          </Row>
        </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Fermer</Button>
        </Modal.Footer>
    </Modal>
    </>
  );
}

export {
    UpdateInfos,
    UpdateExperiences,
    UpdateCompetences,
    AddExperience
}