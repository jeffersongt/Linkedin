import './index.css';
import App from './App';
import User from './routes/profile/profile';
import CompaniesComponent from './routes/companies/companies';
import { SearchCompany, SearchUser } from './routes/search/search';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const rootElement = document.getElementById("root");
var unlogged : boolean = false;
var logged : boolean = true;

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/profil" element={<User />} />
      <Route path="/entreprises" element={<CompaniesComponent />} />
      <Route path="/recherche/entreprise" element={<SearchCompany />} />
      <Route path="/recherche/utilisateur" element={<SearchUser logged={unlogged} />} />
      <Route path="/recherche/utilisateur/logged" element={<SearchUser logged={logged} />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

reportWebVitals();
