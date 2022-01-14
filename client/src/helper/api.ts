import axios from 'axios';

axios.defaults.withCredentials = true;
var id : string = "";

function signup(email: string, password: string) {
  const params = {
    email: email,
    password: password
  }

  axios.post(`http://localhost:8000/users/signup`, params)
    .then(res => {
      console.log(res);
      console.log(res.data);
      alert("Votre inscription avec l'email " + res.data.email + " a bien été prise en compte ! Veuillez vous connecter");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Une erreur " + error.response.status + " est survenue : " + error.response.data.error.message);
      }})
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
  axios.post(`http://localhost:8000/users/me`, { withCredentials: true })
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

export {
  signup,
  signout,
  deleteAccount
}