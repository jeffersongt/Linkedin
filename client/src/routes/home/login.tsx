import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { user } from "../../helper/types";
import { useNavigate } from 'react-router';
import axios from 'axios';

function ShowLogin() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [actualEmail, setEmail] = useState("");
  const [actualPasswd, setPasswd] = useState("");

  let input_user : user = { email: "", password: "", userId: "" };
  let navigate = useNavigate();

  return (
      <>
      <Button variant="outline-primary" className="loginButton" onClick={handleShow}>Connexion</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Connexion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="xxx.xxx@gmail.com" id="emailLOG" value={actualEmail} onChange={e => {input_user.email = e.target.value; setEmail(e.target.value)}} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" placeholder="********" id="passwdLOG" value={actualPasswd} onChange={e => {input_user.password = e.target.value; setPasswd(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" onClick={() => {
              const params = {
                email: actualEmail,
                password: actualPasswd
              }
            
              axios.post(`http://localhost:8000/users/signin`, params)
                .then(res => {
                  console.log(res);
                  console.log(res.data);
                  alert("Connexion réussie ! Bienvenue " + res.data.email);
                  input_user.userId = res.data.id;
                  localStorage.setItem('id', res.data.id);
                  navigate("/profil?id=" + input_user.userId);
                })
                .catch(function (error) {
                  if (error.response) {
                    console.log(error.response.data.error.message);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
                  }})
              handleClose();
              setEmail("");
              setPasswd("");
              }}>
              Se connecter
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
  ShowLogin
}