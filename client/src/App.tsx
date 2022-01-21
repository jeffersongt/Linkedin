import './App.css';
import { NavbarHome, Body } from './routes/exports';
//import NavbarLogged from './components/navbar_logged';

function App() {
  // var navbar : JSX.Element;

  // if (props.cookie !== null) {
  //   navbar = <NavbarLogged/>;
  // }
  // else {
  //   navbar = <NavbarHome/>;
  // }

  return (
    <div>
      {/* {navbar} */}
      <NavbarHome/>
      <Body/>
    </div>
  );
}

export default App;
