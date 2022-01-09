CREATE TABLE users(
    id INT NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    city VARCHAR(50),
    position VARCHAR(100) default 'Unknown',
    company_id INT,
    PRIMARY KEY (id),
    UNIQUE (email),
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE companies(
    id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    domain VARCHAR(70) NOT NULL,
    adress VARCHAR(100) default 'Unknown',
    PRIMARY KEY (id),
    UNIQUE (name)
);

CREATE TABLE competences(
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE experiences(
    id INT NOT NULL,
    company_id INT NOT NULL,
    position VARCHAR(256) NOT NULL,
    started_at DATE NOT NULL,
    ends_at DATE,
    city VARCHAR(50) default 'Unknown',
    PRIMARY KEY (id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

CREATE TABLE user_experience(
    id INT NOT NULL,
    user_id INT NOT NULL,
    experience_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (experience_id) REFERENCES experiences(id)
);

CREATE TABLE user_competence(
    id INT NOT NULL,
    user_id INT NOT NULL,
    competence_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (competence_id) REFERENCES competences(id)
);

CREATE TABLE user_companies(
    id INT NOT NULL,
    user_id INT NOT NULL,
    company_id INT NOT NULL,
    owner BIT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (company_id) REFERENCES companies(id)
);