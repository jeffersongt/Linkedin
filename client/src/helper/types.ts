export interface user {
    email : string;
    password: string;
}

export interface profileInfos {
    first_name : string;
    last_name : string;
    position : string;
    city: string;
    other: string;
}

export interface profileExperience {
    position: string;
    company: string;
    start_date: Date;
    end_date: Date;
    location: string;
}

export interface profileCompetences {
    competence: Array<string>;
}

export interface company {
    name: string;
    domain: string;
    adress: string;
    nb_employees: number;
    employees: Array<string>;
}