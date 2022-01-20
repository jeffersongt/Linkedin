import { NavbarHome, Body } from "./home/homepage";
import { ShowLogin } from "./home/login"
import { ShowSignup } from "./home/signup"
import NavbarLogged from "../components/navbar_logged";
import { signup, signout, deleteAccount, login, searchCompany, searchProfile, getProfile,
    patchProfile, getExperience, deleteExperience, patchExperience, postExperience,
    getCompetence, postCompetence, deleteCompetence, getCompany, postCompany, patchCompany,
    deleteCompany, getEmployee, postEmployee, deleteEmployee } from "../helper/api";
import { InputSearch, SearchHomepage } from "./search/search";

export {
    NavbarHome,
    Body,
    ShowLogin,
    ShowSignup,
    NavbarLogged,
    signup,
    signout,
    deleteAccount,
    login,
    InputSearch,
    SearchHomepage,
    searchCompany,
    searchProfile,
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
    deleteEmployee,
}