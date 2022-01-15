import { NavbarHome, Body } from "./home/homepage";
import { ShowLogin } from "./home/login"
import { ShowSignup } from "./home/signup"
import NavbarLogged from "../components/navbar_logged";
import { UpdateExperiences, UpdateCompetences, AddExperience } from "./profile/update_profile";
import { UpdateCompany, AddCompany } from "./companies/update_companies";
import { deleteCompany, addCompany, updateCompany, addEmployee, deleteEmployee, } from "./companies/actions_companies";
import { signup, signout, deleteAccount } from "../helper/api";

export {
    NavbarHome,
    Body,
    ShowLogin,
    ShowSignup,
    NavbarLogged,
    UpdateExperiences,
    UpdateCompetences,
    AddExperience,
    UpdateCompany,
    AddCompany,
    deleteCompany,
    addCompany,
    updateCompany,
    addEmployee,
    deleteEmployee,
    signup,
    signout,
    deleteAccount
}