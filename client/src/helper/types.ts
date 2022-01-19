export interface user {
    email : string;
    password : string;
    userId : string;
}

export interface profileInfos {
    id : string;
    first_name : string;
    last_name : string;
    position : string;
    city : string;
    company : string;
}

export interface profileExperience {
    id : Array<string>;
    position : Array<string>;
    company : Array<string>;
    city : Array<string>;
}

export interface profileCompetences {
    id : Array<string>;
    competence : Array<string>;
}

export interface company {
    id : string;
    name : string;
    domain : string;
    adress : string;
}