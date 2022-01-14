import express from 'express';
import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';

import ownershipMiddleware from '../../middlewares/ownershipMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';
import validate from '../../middlewares/validationMiddleware';

import competenceMiddleware from './competenceMiddleware';
import * as controllers from './competenceControllers';
import { CompetenceCreateDto, CompetenceUpdateDto } from './competenceTypes';

const router = express.Router();

router.get(
  '/users/:userId/competences',
  authMiddleware,
  handler(async (req, res) => {
    const competences = await controllers.listCompetences(req.params.userId);
    res.send(competences);
  }),
);

router.post(
  '/users/:userId/competences',
  validate(CompetenceCreateDto),
  ownershipMiddleware,
  handler(async (req, res) => {
    const competence = await controllers.createNewCompetence(req.params.userId, req.body);
    res.status(httpStatus.CREATED).send(competence);
  }),
);

router.get(
  '/users/:userId/competences/:competenceId',
  authMiddleware,
  competenceMiddleware,
  handler(async (req, res) => {
    const competence = await controllers.getCompetence(res.locals.competence);
    res.send(competence);
  }),
);

router.patch(
  '/users/:userId/competences/:competenceId',
  validate(CompetenceUpdateDto),
  ownershipMiddleware,
  competenceMiddleware,
  handler(async (req, res) => {
    const competence = await controllers.updateCompetence(res.locals.competence, req.body);
    res.send(competence);
  }),
);

router.delete(
  '/users/:userId/competences/:competenceId',
  ownershipMiddleware,
  competenceMiddleware,
  handler(async (req, res) => {
    await controllers.deleteCompetence(res.locals.competence);
    res.sendStatus(httpStatus.NO_CONTENT);
  }),
);

export default router;
