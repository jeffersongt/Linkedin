import '../../App.css';
import { Container, Button,
   Image, Col, Row } from 'react-bootstrap';
import NavbarLogged from '../../components/navbar_logged';
import { UpdateInfos, UpdateExperiences, UpdateCompetences, AddExperience } from '../exports';
import Divider from "@material-ui/core/Divider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { signout, deleteAccount } from '../exports';

function Profile() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  
  return (
    <div className="body__style">
      <NavbarLogged/>
      <Body/>
    </div>
  );
}

function Body() {
  return (
    <>
    <PersonalInfos/>
    
    {/* Add experience */}
    <Row>
      <Col md={12} className="centered__buttons">
        <AddExperience/>
      </Col>
    </Row>
    
    <ExperiencesList/>
    <CompetencesList/>
    
    {/* Logout button */}
    <Row>
      <Col md={12} className="centered__buttons">
        <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={signout}>Déconnexion</Button>
      </Col>
    </Row>

    {/* Delete account button */}
    <Row>
      <Col md={12} className="centered__buttons">
          <Button variant="danger" style={{marginTop: 10, marginBottom: 10}} onClick={deleteAccount}>Supprimer le compte</Button>
      </Col>
    </Row>
    </>
  );
}

function PersonalInfos() {
  

  return (
    <>
    <Container className="profile__infos">
      <Row>
        <Col md={11} className="profile__infos__content">
          <Image style={{ width: '20%', marginTop: 5}} src="https://cdn.futura-sciences.com/buildsv6/images/mediumoriginal/1/6/4/1642c0dc85_50184905_bored-ape-yatch-club-2344.jpg" roundedCircle />
          <br/>
          <a style={{fontWeight: 'bold', fontSize: 28}}>Jefferson Guiot</a>
          <br/>
          <a style={{opacity: 0.9, fontSize: 20}}>Développeur fullstack <a style={{fontWeight: 'bold'}}>à</a> Apple</a>
          <br/>
          <a style={{opacity: 0.7, fontSize: 17}}>Paris et périphérie</a>
        </Col>
        <Col md={1} style={{alignItems: 'flex-end'}}>
          <UpdateInfos/>
        </Col>
      </Row>
    </Container>
    </>
  );
}

function ExperiencesList() {
  return (
    <>
    <Container className="profile__experiences">
      <Row>
        <Col md={4}>
          <h3 style={{fontWeight: 'normal', marginTop: 15}}>Expériences</h3>
        </Col>
      </Row>
      <br/>

      {/* Fetch the experiences and generate the rows */}
      <Divider />
      <br/>
      <Row>
        <Col md={11}>
          <a style={{fontWeight: 'bold', fontSize: 23}}>Développeur web</a>
          <br/>
          <a style={{opacity: 0.7, fontSize: 18}}>Jestimo</a>
          <br/>
          <a>Du <a style={{fontWeight: 'bold'}}>01/09/2021</a> jusqu'à <a style={{fontWeight: 'bold'}}>Aujourd'hui</a></a>
          <br/>
          <a>Paris</a>
        </Col>
        <Col md={1} style={{alignItems: 'flex-end'}}>
            <UpdateExperiences/>
        </Col>
      </Row>
      <br/>

      <Divider />
      <br/>
      <Row>
        <Col md={11}>
          <a style={{fontWeight: 'bold', fontSize: 23}}>Data analyst</a>
          <br/>
          <a style={{opacity: 0.7}}>SFR</a>
          <br/>
          <a>Du <a style={{fontWeight: 'bold'}}>01/09/2020</a> jusqu'à <a style={{fontWeight: 'bold'}}>31/12/2020</a></a>
          <br/>
          <a>Issy-les-moulineaux</a>
        </Col>
        <Col md={1} style={{alignItems: 'flex-end'}}>
            <UpdateExperiences/>
        </Col>
      </Row>
      <br/>
    </Container>
    </>
  );
}

function CompetencesList() {
  return (
    <>
    <Container className="profile__competences">
      <Row>
        <Col md={11}>
          <h3 style={{fontWeight: 'normal', marginTop: 15}}>Compétences</h3>
        </Col>
        <Col md={1} style={{alignItems: 'flex-end', marginTop: 10}}>
            <UpdateCompetences/>
        </Col>
      </Row>
      <br/>
      <Divider />

      <Row>
        <Col md={11}>
          <br/>
          <a style={{fontWeight: 'bold', fontSize: 20}}><FontAwesomeIcon icon={faThumbtack} style={{color: 'black'}}/> Epinglées</a>
          <br/>
          <a>C</a>
          <br/>
          <a>English</a>
          <br/>
          <a>PHP</a>
          <br/>
          <br/>
          <Divider />
          <br/>
          <a>Python</a>
          <br/>
          <a>JS</a>
          <br/>
          <a>TS</a>
          <br/>
          <a>Flask</a>
          <br/>
          <a>Rust</a>
          <br/>
          <a>Bootstrap</a>
          <br/>
          <a>Unix</a>
          <br/>
          <br/>
        </Col>
       
      </Row>
    </Container>
    </>
  );
}

export default Profile;