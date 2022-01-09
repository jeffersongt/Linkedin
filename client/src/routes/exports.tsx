import { NavbarHome, Body } from "./home/homepage";
import { ShowLogin } from "./home/login"
import { ShowSignup } from "./home/signup"
import NavbarLogged from "../components/navbar_logged";
import { UpdateInfos, UpdateExperiences, UpdateCompetences, AddExperience } from "./profile/update_profile";
import { logout, deleteAccount, deleteCompetence, addCompetence, updateExperience, deleteExperience, addExperience, updateProfile } from "./profile/actions_profile";
import { UpdateCompany, AddCompany } from "./companies/update_companies";
import { deleteCompany, addCompany, updateCompany, addEmployee, deleteEmployee, } from "./companies/actions_companies";

export {
    NavbarHome,
    Body,
    ShowLogin,
    ShowSignup,
    NavbarLogged,
    UpdateInfos,
    UpdateExperiences,
    UpdateCompetences,
    AddExperience,
    logout,
    deleteAccount,
    deleteCompetence,
    addCompetence,
    updateExperience,
    deleteExperience,
    addExperience,
    updateProfile,
    UpdateCompany,
    AddCompany,
    deleteCompany,
    addCompany,
    updateCompany,
    addEmployee,
    deleteEmployee
}