import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { user } from "../../helper/types";
import { useNavigate } from 'react-router';

function ShowSignup() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <>
      <Button variant="light" className="signupButton" onClick={handleShow}>Inscription</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inscription</Modal.Title>
        </Modal.Header>
        <Modal.Body><LoginForm/></Modal.Body>
        <Modal.Footer>
          <a style={{opacity: 0.8}}>Linkedin Entreprise</a>
        </Modal.Footer>
      </Modal>
      </>
  );
}

function LoginForm() {
  const [actualEmail, setEmail] = useState("");
  const [actualPasswd, setPasswd] = useState("");

  let input_user : user = { email: "", password: "" };
  let navigate = useNavigate();

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="xxx.xxx@gmail.com" id="emailLOG" value={actualEmail} onChange={e => {input_user.email = e.target.value; setEmail(e.target.value)}} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" placeholder="********" id="passwdLOG" value={actualPasswd} onChange={e => {input_user.password = e.target.value; setPasswd(e.target.value)}}/>
        </Form.Group>
        <Button variant="primary" onClick={() => { navigate("/profil") }}>
          S'inscrire
        </Button>
      </Form>
    </>
  );
}

export {
  ShowSignup
}