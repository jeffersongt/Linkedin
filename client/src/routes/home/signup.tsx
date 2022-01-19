import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useState } from 'react';

import { User } from "../../helper/types";
import { signup } from "../exports";

function ShowSignup() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [actualEmail, setEmail] = useState("");
  const [actualPasswd, setPasswd] = useState("");
  let input_user : User = { email: "", password: "", userId: "" };

  return (
      <>
      <Button variant="light" className="signupButton" onClick={handleShow}>Inscription</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inscription</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="xxx.xxx@gmail.com" id="emailLOG" value={actualEmail} onChange={e => {input_user.email = e.target.value; setEmail(e.target.value)}} />
          </Form.Group>
          <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">Le mot de passe doit comporter minimum 8 caractères</Tooltip>} children={
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" placeholder="********" id="passwdLOG" value={actualPasswd} onChange={e => {input_user.password = e.target.value; setPasswd(e.target.value)}}/>
            </Form.Group>
          } ></OverlayTrigger>
          <Button variant="primary" onClick={ async () => {
            const result = await signup(actualEmail, actualPasswd);
            if (result === true) {
              handleClose();
              setEmail("");
              setPasswd("");
            }
          }}>
            S'inscrire
          </Button>
        </Form>

        </Modal.Body>
        <Modal.Footer>
          <a style={{opacity: 0.8}}>Linkedin Entreprise</a>
        </Modal.Footer>
      </Modal>
      </>
  );
}

export {
  ShowSignup
}