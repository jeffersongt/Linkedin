import '../../App.css';
import NavbarLogged from '../../components/navbar_logged';
import { Container, Col, Row, OverlayTrigger, Tooltip, InputGroup, Button, FormControl } from 'react-bootstrap';
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { NavbarHome, searchUser, searchCompany } from '../exports';
import { Infos, Company } from '../../helper/types';

var profile : Infos = { id : "", first_name : "", last_name : "", position : "", city : "", company : "" }
var res_company : Company = { id : "", name : "", domain : "", adress : "" }

function InputSearch() {
  let navigate = useNavigate();

  const [id, setId] = useState("");
  let actualId : string = "";

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="button-tooltip-2">Recherchez une entreprise ou un utilisateur par son ID</Tooltip>} children={
    <InputGroup className="d-flex">
      <Button variant="outline-secondary" onClick={ async () => {
        const result_u = await searchUser(id);
        if (result_u.first_name !== ""){
          profile.first_name = result_u.first_name;
          profile.last_name = result_u.last_name;
          profile.position = result_u.position;
          profile.company = result_u.company;
          profile.city = result_u.city;
          navigate("/recherche/utilisateur/logged");
        }
        else if (result_u.first_name === "") {
          const result_c = await searchCompany(id);
          if (result_c.name !== "") {
            res_company.name = result_c.name;
            res_company.domain = result_c.domain;
            res_company.adress = result_c.adress;
            alert("oskour");
            navigate("/recherche/entreprise");
          }
        }
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

function SearchCompany() {
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
              <a style={{fontWeight: 'bold', fontSize: 23}}>{res_company.name}</a>
              <br/>
              <a style={{opacity: 0.7, fontSize: 20}}>{res_company.domain}</a>
              <br/>
              <a>{res_company.adress}</a>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

function SearchUser(props: { logged: boolean; }) {
  var navbar : JSX.Element

  if (props.logged === true) {
    navbar = <NavbarLogged/>;
  }
  else {
    navbar = <NavbarHome/>;
  }

  return (
      <>
       <div style={{
          backgroundImage: `url("https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")`,backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh'
        }}>
          {navbar}
          <BodyUser/>
      </div>
      </>
  );
}

function BodyUser() {
  return (
    <>
    <ResultsUser/>
    </>
  );
}

function ResultsUser() {
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
            <a style={{fontWeight: 'bold', fontSize: 23}}>{profile.first_name} {profile.last_name}</a>
            <br/>
            <a style={{opacity: 0.7, fontSize: 20}}>{profile.position}</a>
            <br/>
            <a>{profile.company}</a>
            <br/>
            <a style={{fontWeight: 'bold'}}>{profile.city}</a>
            </Row>
        </Col>
      </Row>
    </Container>
  </>
  );
}

function SearchHomepage(props : { id: string }) {
  let navigate = useNavigate();

  return (
    <Button variant="outline-secondary" onClick={ async () => {
      const result = await searchUser(props.id);
      if (result.first_name !== "") {
        profile.first_name = result.first_name;
        profile.last_name = result.last_name;
        profile.position = result.position;
        profile.company = result.company;
        profile.city = result.city;
        navigate("/recherche/utilisateur/");
      }
    }}><FontAwesomeIcon icon={faSearch} style={{color: 'black'}}/></Button>
  );
}

export {
  SearchCompany,
  SearchUser,
  InputSearch,
  SearchHomepage
}