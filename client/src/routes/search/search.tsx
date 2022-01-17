import '../../App.css';
import NavbarLogged from '../../components/navbar_logged';
import { Container, Col, Row, OverlayTrigger, Tooltip, InputGroup, Button, FormControl } from 'react-bootstrap';
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function InputSearch() {
  let navigate = useNavigate();

  const [id, setId] = useState("");
  let actualId : string = "";

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="button-tooltip-2">Recherchez une entreprise ou un utilisateur par son ID</Tooltip>} children={
    <InputGroup className="d-flex">
      <Button variant="outline-secondary" onClick={() => {
        //navigate('/recherche')
        const url_company : string = "http://localhost:8000/users/me/companies/" + id;
        const url_user : string = "http://localhost:8000/users/" + id;
        axios.get(url_company, { withCredentials: true })
          .then(res => {
            console.log(res);
            alert("L'entreprise " + res.data.name + " a été trouvée !");
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data.error.message);
              console.log(error.response.status);
              console.log(error.response.headers);
              axios.get(url_user, { withCredentials: true })
              .then(res => {
                console.log(res);
                alert("L'utilisateur " + res.data.email + " a été trouvé !");
              })
              .catch(function (error) {
                if (error.response) {
                  console.log(error.response.data.error.message);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                  alert("La recherche pour l'ID " + id + " n'a pas aboutie.");
                }})
          }})
        setId("");
      }}><FontAwesomeIcon icon={faSearch} style={{color: 'black'}}/></Button>
      <FormControl
        placeholder="Recherche ..."
        aria-label="Username"
        aria-describedby="basic-addon1"
        value={id} onChange={e => { actualId = e.target.value; setId(e.target.value)}}
      />
    </InputGroup>
    }    ></OverlayTrigger>
  );
}

function Search() {
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
    return (
      <>
      <ResultsCompany/>
      </>
    );
}

function ResultsCompany() {
  return (
    <>
    <Container className="search__infos">
        <Row>
          <Col md={11} className="search__infos__content">
            <Row>
              <Col md={12}>
                <h4 style={{fontWeight: 'bold', marginTop: 15}}>Résultat de la recherche :</h4>
              </Col>
            </Row>
            <br/>
            <Divider/>
            <br/>
            <Row className="search__result">
              <a style={{fontWeight: 'bold', fontSize: 23}}>Jestimo</a>
              <br/>
              <a style={{opacity: 0.7, fontSize: 20}}>Estimation immobilière</a>
              <br/>
              <a>39 rue de courcelles, 75008 Paris</a>
              <br/>
              <a><a style={{fontWeight: 'bold'}}>15</a> employés</a>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export {
  Search,
  InputSearch
}