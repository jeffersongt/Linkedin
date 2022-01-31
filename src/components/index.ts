import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import users from './user/userRoutes';
import profiles from './profile/profileRoutes';
import competences from './competence/competenceRoutes';
import experiences from './experience/experienceRoutes';
import companies from './company/companyRoutes';
import employees from './employee/employeeRoutes';

/* API doc generation */
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Linkedin API',
      description: 'Linkedin API Information',
      contact: {
        name: 'https://github.com/jeffersongt',
      },
      servers: ['http://localhost:8000/'],
    },
  },
  apis: ['./src/components/user/userRoutes.ts', './src/components/profile/profileRoutes.ts', './src/components/experience/experienceRoutes.ts', './src/components/employee/employeeRoutes.ts', './src/components/competence/competenceRoutes.ts', './src/components/company/companyRoutes.ts'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
  
/* To enable routes */
const router = express.Router();

router.get('/ping', (req, res) => res.send('pong'));
 
router.use(users);
router.use(profiles);
router.use(competences);
router.use(experiences);
router.use(competences);
router.use(experiences);
router.use(companies);
router.use(employees);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;
