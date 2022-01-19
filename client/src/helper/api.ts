import axios from 'axios';

import { Infos, Company, Companies, Experiences, Competences } from './types';

axios.defaults.withCredentials = true

async function signup(email: string, password: string) {
  const url : string = "http://localhost:8000/users/signup";
  const params = {
    email: email,
    password: password
  }
  var signup : boolean = false;

  await axios.post(url, params, { withCredentials: true })
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
  const url : string = "http://localhost:8000/users/signout";

  await axios.post(url, { withCredentials: true })
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
  const url : string = "http://localhost:8000/users/me";

  await axios.delete(url, { withCredentials: true })
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
  const url : string = "http://localhost:8000/users/signin";
  const params = {
    email: email,
    password: password
  }
  var id : string = "";

  await axios.post(url, params, { withCredentials: true })
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
  const url : string = "http://localhost:8000/users/" + id + "/profiles";
  var result : Infos = { id: "", first_name: "", last_name: "", position: "", city: "", company: "" };

  await axios.get(url, { withCredentials: true })
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
  var result : Company = { id: "", name : "", domain : "", adress : "" };

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
  const url : string = "http://localhost:8000/users/me/profiles";
  var profile : Infos = { id: "", first_name : "", last_name : "", position : "", city: "", company: "" };

  await axios.get(url, { withCredentials: true })
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
  const url : string = "http://localhost:8000/users/me/profiles/" + id;

  await axios.patch(url, params, { withCredentials: true })
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
  const url : string = "http://localhost:8000/users/me/experiences";
  var experience : Experiences = { id: [], position: [], company: [], city: [] }

  await axios.get(url, { withCredentials: true })
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
  const url : string = "http://localhost:8000/users/me/experiences";

  await axios.post(url, params, { withCredentials: true })
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
  const url : string = "http://localhost:8000/users/me/experiences/" + id;

  await axios.patch(url, params, { withCredentials: true })
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

async function deleteExperience(id: string) {
  const url : string = "http://localhost:8000/users/me/experiences/" + id;

  await axios.delete(url, { withCredentials: true })
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
  const url : string = "http://localhost:8000/users/me/competences";
  var competence : Competences = { id: [], competence: [] };

  await axios.get(url, { withCredentials: true })
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
  const url : string = "http://localhost:8000/users/me/competences";

  await axios.post(url, params, { withCredentials: true })
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

async function deleteCompetence(id: string) {
  const url : string = "http://localhost:8000/users/me/competences/" + id;

  await axios.delete(url, { withCredentials: true })
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

async function getCompany() {
  const url : string = "http://localhost:8000/users/me/companies";
  var company : Companies = { id: [], name: [], domain: [], adress: [] };

  await axios.get(url, { withCredentials: true })
    .then(res => {
      console.log(res);
      for(let i = 0; i < res.data.length; i++) {
        company.id.push(res.data[i].id);
        company.name.push(res.data[i].name);
        company.domain.push(res.data[i].domain);
        company.adress.push(res.data[i].adress);
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
  return (company);
}

async function postCompany(parameters : { name: string, domain: string, adress: string }) {
  const url : string = "http://localhost:8000/users/me/companies";
  const params = {
    name: parameters.name,
    domain: parameters.domain,
    adress: parameters.adress
  }

  await axios.post(url, params, { withCredentials: true })
    .then(res => {
      console.log(res);
      alert("L'entreprise " + res.data.name + " a bien été créée !");
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

async function patchCompany(parameters : { name: string, domain: string, adress: string }, id : string) {
  const url : string = "http://localhost:8000/users/me/companies/" + id;
  const params = {
    name: parameters.name,
    domain: parameters.domain,
    adress: parameters.adress
  }

  await axios.patch(url, params, { withCredentials: true })
    .then(res => {
      console.log(res);
      alert("L'entreprise " + res.data.name + " a été mise à jour !");
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

async function deleteCompany(id : string) {
  const url : string = "http://localhost:8000/users/me/companies/" + id;
  
  await axios.delete(url, { withCredentials: true })
    .then(res => {
      console.log(res);
      alert("L'entreprise " + res.data.name + " a été supprimée !");
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

async function getEmployee(id : string) {
  const url : string = "http://localhost:8000/users/me/companies/" + id + "/employees";
  var arrEmployee : string[] = [];

  await axios.get(url, { withCredentials: true })
    .then(res => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];
        arrEmployee.push(element);
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
  return (arrEmployee);
}

async function postEmployee(parameters : { user : string, company : string }, id :string) {
  const url : string = "http://localhost:8000/users/me/companies/" + id + "/employees";
  const params = {
    user: parameters.user, //pas le bon id c est celui du user pas de l employé
    company: parameters.company,
  }

  await axios.post(url, params, { withCredentials: true })
    .then(res => {
      console.log(res);
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

async function deleteEmployee(companyId : string, employeeId : string) {
  const url : string = "http://localhost:8000/users/me/companies/" + companyId + "/employees/" + employeeId;

  await axios.delete(url, { withCredentials: true })
    .then(res => {
      console.log(res);
      alert("L'employé a été supprimée de l'entreprise avec succès !");
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
  deleteCompetence,
  getCompany,
  postCompany,
  patchCompany,
  deleteCompany,
  getEmployee,
  postEmployee,
  deleteEmployee
}