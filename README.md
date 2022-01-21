<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
# Table of contents

- [Linkedin](#linkedin)
- [Usage](#usage)
- [API](#api)
- [Technologies](#technologies)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Linkedin

This projects consists in re-implementing some features of Linkedin such creating your profile, companies, link employees

and much more ...

# Usage

To launch the project type at the root of the cloned repository :

`docker-compose up --build`

# API

| Method | Endpoint | Headers | Body | Query params | Response |
| --- | --- | --- | --- | --- | --- |
| POST | /users/signup |  | email : string, password : string |  |  |
| POST | /users/signin | credentials : include | email : string, password : string |  |  |
| DELETE | /users/:userId | credentials : include |  | userId |  |
| POST | /users/signout | credentials : include |  |  |  |
| GET | /users/:userId/profiles/:profileId | credentials : include |  | userId, profileId | id : string, fst_name : string, last_name : string, position : string, company : string, city : string |
| PATCH | /users/:userId/profiles/:profileId | credentials : include | id : string, fst_name : string, last_name : string, position : string, company : string, city : string | userId, profileId |  |
| GET | /users/:userId/experiences | credentials : include |  | userId | { id : string, position : string, company : string, city : string
} |
| GET | /users/:userId/experiences/:experienceId | credentials : include |  | userId, experienceId | id : string, position : string, company : string, city : string |
| POST | /users/:userId/experiences | credentials : include | id : string, position : string, company : string, city : string | userId, experienceId |  |
| PATCH | /users/:userId/experiences/:experienceId | credentials : include | id : string, position : string, company : string, city : string | userId, experienceId |  |
| DELETE | /users/:userId/experiences/:experienceId | credentials : include |  | userId, experienceId |  |
| GET | /users/:userId/competences | credentials : include |  | userId | { id : string, name : string } |
| GET | /users/:userId/competences/:competenceId | credentials : include |  | userId, competenceId | id : string, name : string |
| POST | /users/:userId/competences | credentials : include | id : string, name : string | userId |  |
| DELETE | /users/:userId/competences/:competenceId | credentials : include |  | userId,
competenceId |  |
| GET | /users/:userId/companies | credentials : include |  |  | { id : string, name : string, domain : string, adress : string
} |
| GET | /users/:userId/companies/:companyId | credentials : include |  | companyId | id : string, name : string, domain : string, adress : string |
| POST | /users/:userId/companies/ | credentials : include | id : string, name : string, domain : string, adress : string |  |  |
| PATCH | /users/:userId/companies/:companyId | credentials : include | id : string, name : string, domain : string, adress : string | companyId |  |
| DELETE | /users/:userId/companies/:companyId | credentials : include |  | companyId |  |
| GET | /users/:userId/companies/:companyId/employees | credentials : include |  |  | { id : string, name : string } |
| POST  | /users/:userId/companies/:companyId/employees | credentials : include | userId : string, companyId : string |  |  |
| DELETE | /users/:userId/companies/:companyId/employees | credentials : include |  |  |  |

# Technologies

 - [Typescript](https://www.typescriptlang.org/)
 - [Express](https://expressjs.com/)
 - [Prisma (ORM)](https://www.prisma.io/)
 - [Bcrypt (password hash)](https://www.npmjs.com/package/bcrypt)
 - [Eslint (styling)](https://eslint.org/)
 - [Husky (pre commit hooks)](https://typicode.github.io/husky/#/)
 - [Github action (CI/CD)](https://github.com/features/actions)
 - [Redis (session management)](https://redis.io/)
 - [Docker](https://www.docker.com/)
