import axios from 'axios';

import { profileInfos, company, profileExperience, profileCompetences } from './types';

async function signup(email: string, password: string) {
  var signup : boolean = false;
  const params = {
    email: email,
    password: password
  }

  await axios.post(`http://localhost:8000/users/signup`, params, { withCredentials: true })
    .then(res => {
      console.log(res);
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

async function signout() {
  await axios.post(`http://localhost:8000/users/signout`, { withCredentials: true })
    .then(res => {
      console.log(res);
      alert("Déconnexion réussie !");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
  return (0);
}

async function deleteAccount() {
  await axios.delete(`http://localhost:8000/users/me`, { withCredentials: true })
    .then(res => {
      console.log(res);
      alert("Votre compte a été supprimé avec succès !");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
  return (0);
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
  var result : profileInfos = { id: "", first_name: "", last_name: "", position: "", city: "", company: "" };

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
  var result : company = { id: "", name : "", domain : "", adress : "" };

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

async function getProfile() {
  var profile : profileInfos = { id: "", first_name : "", last_name : "", position : "", city: "", company: "" };

  await axios.get(`http://localhost:8000/users/me/profiles`, { withCredentials: true })
    .then(res => {
      console.log(res);
      profile.first_name = res.data[0].fst_name;
      profile.last_name = res.data[0].last_name;
      profile.city = res.data[0].city;
      profile.position = res.data[0].position;
      profile.company = res.data[0].company;
      profile.id = res.data[0].id;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
  return (profile);
}

async function patchProfile(params : { fst_name : string, last_name : string, position : string, city: string, company: string }, id : string) {
  await axios.patch("http://localhost:8000/users/me/profiles/" + id, params, { withCredentials: true })
    .then(res => {
      console.log(res);
      alert("Votre profil a été mis à jour avec succès !");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
  return (0);
}

async function getExperience() {
  var experience : profileExperience = { id: [], position: [], company: [], city: [] }

  await axios.get(`http://localhost:8000/users/me/experiences`, { withCredentials: true })
    .then(res => {
      console.log(res);
      for(let i = 0; i < res.data.length; i++) {
        experience.id.push(res.data[i].id);
        experience.company.push(res.data[i].company);
        experience.position.push(res.data[i].position);
        experience.city.push(res.data[i].city);
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      }})
  return (experience);
}

async function postExperience(params : { position: string, company: string, city: string }) {
  await axios.post(`http://localhost:8000/users/me/experiences`, params, { withCredentials: true })
    .then(res => {
      console.log(res);
      alert("L'expérience " + res.data.position + " a été ajoutée avec succès !");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
    }})
  return (0);
}

async function patchExperience(params : { position: string, company: string, city: string }, id: string) {
  await axios.patch("http://localhost:8000/users/me/experiences/" + id, params, { withCredentials: true })
    .then(res => {
      console.log(res);
      alert("L'expérience " + res.data.position + " a été mise à jour !");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
  return (0);
}

async function deleteExperience(id : string) {
  await axios.delete("http://localhost:8000/users/me/experiences/" + id, { withCredentials: true })
    .then(res => {
      console.log(res);
      alert("L'expérience a été supprimée avec succès !");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
  return (0);
}

async function getCompetence() {
  var competence : profileCompetences = { id: [], competence: [] };

  await axios.get(`http://localhost:8000/users/me/competences`, { withCredentials: true })
    .then(res => {
      console.log(res);
      for(let i = 0; i < res.data.length; i++) {
        competence.competence.push(res.data[i].name);
        competence.id.push(res.data[i].id);
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
      }})
  return (competence);
}

async function postCompetence(params : { name: string }) {
  await axios.post("http://localhost:8000/users/me/competences", params, { withCredentials: true })
    .then(res => {
      console.log(res);
      alert("La compétence " + res.data.name + " a été ajoutée avec succès !");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
  return (0);
}

async function deleteCompetence(id : string) {
  await axios.delete("http://localhost:8000/users/me/competences/" + id, { withCredentials: true })
    .then(res => {
      console.log(res);
      alert("La compétence a été supprimée avec succès !");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
  return (0);
}

export {
  signup,
  signout,
  deleteAccount,
  login,
  searchUser,
  searchCompany,
  getProfile,
  patchProfile,
  getExperience,
  postExperience,
  patchExperience,
  deleteExperience,
  getCompetence,
  postCompetence,
  deleteCompetence
}