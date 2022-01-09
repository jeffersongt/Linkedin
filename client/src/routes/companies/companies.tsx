import '../../App.css';
import NavbarLogged from '../../components/navbar_logged';
import { UpdateCompany, AddCompany } from '../exports';
import { Container, Col, Row } from 'react-bootstrap';
import Divider from "@material-ui/core/Divider";

function Companies() {
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
        <Row>
          <Col md={12} className="centered__buttons">
            <AddCompany/>
          </Col>
        </Row>

        <Container className="companies__my">
          <Row>
            <Col md={4}>
              <h3 style={{fontWeight: 'normal', marginTop: 15}}>Mes entreprises</h3>
            </Col>
          </Row>
          <br/>

          {/* Fetch the companies and generate the rows */}
          <Divider />
          <br/>
          <Row>
            <Col md={11}>
              <a style={{fontWeight: 'bold', fontSize: 23}}>TerraForma</a>
              <br/>
              <a style={{opacity: 0.7, fontSize: 20}}>Formations</a>
              <br/>
              <a>3 rue de la flûte, 75013 Paris</a>
              <br/>
              <a><a style={{fontWeight: 'bold'}}>25</a> employés</a>
            </Col>
            <Col md={1} style={{alignItems: 'flex-end'}}>
              <UpdateCompany/>
            </Col>
          </Row>
          <br/>

          <Divider />
          <br/>
          <Row>
            <Col md={11}>
              <a style={{fontWeight: 'bold', fontSize: 23}}>JayVente</a>
              <br/>
              <a style={{opacity: 0.7, fontSize: 20}}>Vente d'articles</a>
              <br/>
              <a>4 avenue rapp, 75007 Paris</a>
              <br/>
              <a><a style={{fontWeight: 'bold'}}>100</a> employés</a>
            </Col>
            <Col md={1} style={{alignItems: 'flex-end'}}>
            <UpdateCompany/>
            </Col>
          </Row>
          <br/>
        </Container>
      </>
    );
}

export default Companies;