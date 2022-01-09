import '../../App.css';
import NavbarLogged from '../../components/navbar_logged';
import { Container, Col, Row } from 'react-bootstrap';
import Divider from "@material-ui/core/Divider";

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

export default Search;