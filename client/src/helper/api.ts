import axios from 'axios';
import { profileInfos, company } from './types';

axios.defaults.withCredentials = true;

async function signup(email: string, password: string) {
  var signup : boolean = false;
  const params = {
    email: email,
    password: password
  }

  await axios.post(`http://localhost:8000/users/signup`, params)
    .then(res => {
      console.log(res);
      console.log(res.data);
      alert("Votre inscription avec l'email " + res.data.email + " a bien été prise en compte ! Veuillez vous connecter");
      signup = true;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
  return (signup);
}

function signout() {
  axios.post(`http://localhost:8000/users/signout`)
    .then(res => {
      console.log(res);
      console.log(res.data);
      alert("Déconnexion réussie !");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
}

function deleteAccount() {
  axios.delete(`http://localhost:8000/users/me`, { withCredentials: true })
    .then(res => {
      console.log(res);
      console.log(res.data);
      alert("Votre compte a été supprimé avec succès !");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
}

async function login(email: string, password: string) {
  var id : string = "";
  const params = {
    email: email,
    password: password
  }

  await axios.post(`http://localhost:8000/users/signin`, params, { withCredentials: true })
    .then(res => {
      console.log(res);
      alert("Connexion réussie ! Bienvenue " + res.data.email);
      id = res.data.id;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
  return (id);
}

async function searchUser(id : string) {
  const url_user : string = "http://localhost:8000/users/" + id + "/profiles";
  var result : profileInfos = { first_name : "", last_name : "", position : "", city: "", company: "" };

  await axios.get(url_user, { withCredentials: true })
    .then(res => {
      console.log(res);
      result.first_name = res.data[0].fst_name;
      result.last_name = res.data[0].last_name;
      result.position = res.data[0].position;
      result.city = res.data[0].city;
      result.company = res.data[0].company;
      alert("L'utilisateur " + res.data[0].fst_name + " " + res.data[0].last_name + " a été trouvé !");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("La recherche pour l'ID " + id + " n'a pas aboutie.");
    }})
  return (result);
}

async function searchCompany(id : string) {
  const url_user : string = "http://localhost:8000/users/me/companies/" + id;
  var result : company = { name : "", domain : "", adress : "" };

  await axios.get(url_user, { withCredentials: true })
    .then(res => {
      console.log(res);
      result.name = res.data.name;
      result.domain = res.data.domain;
      result.adress = res.data.adress;
      alert("L'entreprise " + res.data.name + " a été trouvée !");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
    }})
  return (result);
}

export {
  signup,
  signout,
  deleteAccount,
  login,
  searchUser,
  searchCompany
}