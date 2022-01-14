import express from 'express';

import users from './user/userRoutes';
import profiles from './profile/profileRoutes';
import competences from './competence/competenceRoutes';
import experiences from './experience/experienceRoutes';
import companies from './company/companyRoutes';

const router = express.Router();

router.get('/ping', (req, res) => res.send('pong'));

router.use(users);
router.use(profiles);
router.use(competences);
router.use(experiences);
router.use(competences);
router.use(experiences);
router.use(companies);

export default router;
