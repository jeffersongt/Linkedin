import './index.css';
import App from './App';
import User from './routes/profile/profile';
import Companies from './routes/companies/companies';
import Search from './routes/search/search';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/profil" element={<User />} />
      <Route path="/entreprises" element={<Companies />} />
      <Route path="/recherche" element={<Search />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
