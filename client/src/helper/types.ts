export interface User {
    email : string;
    password : string;
    userId : string;
}

export interface Infos {
    id : string;
    first_name : string;
    last_name : string;
    position : string;
    city : string;
    company : string;
}

export interface Experiences {
    id : Array<string>;
    position : Array<string>;
    company : Array<string>;
    city : Array<string>;
}

export interface Experience {
    id : string;
    position : string;
    company : string;
    city : string;
}

export interface Competences {
    id : Array<string>;
    competence : Array<string>;
}

export interface Competence {
    id : string;
    competence : string;
}

export interface Companies {
    id : Array<string>;
    name : Array<string>;
    domain : Array<string>;
    adress : Array<string>;
}

export interface Company {
    id : string;
    name : string;
    domain : string;
    adress : string;
}

