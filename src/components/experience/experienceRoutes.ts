import express from 'express';
import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';

import ownershipMiddleware from '../../middlewares/ownershipMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';
import validate from '../../middlewares/validationMiddleware';

import experienceMiddleware from './experienceMiddleware';
import * as controllers from './experienceControllers';
import { ExperienceCreateDto, ExperienceUpdateDto } from './experienceTypes';

const router = express.Router();

router.get(
  '/users/:userId/experiences',
  authMiddleware,
  handler(async (req, res) => {
    const experiences = await controllers.listExperiences(req.params.userId);
    res.send(experiences);
  }),
);

router.post(
  '/users/:userId/experiences',
  validate(ExperienceCreateDto),
  ownershipMiddleware,
  handler(async (req, res) => {
    const experience = await controllers.createNewExperience(req.params.userId, req.body);
    res.status(httpStatus.CREATED).send(experience);
  }),
);

router.get(
  '/users/:userId/experiences/:experienceId',
  authMiddleware,
  experienceMiddleware,
  handler(async (req, res) => {
    const experience = await controllers.getExperience(res.locals.experience);
    res.send(experience);
  }),
);

router.patch(
  '/users/:userId/experiences/:experienceId',
  validate(ExperienceUpdateDto),
  ownershipMiddleware,
  experienceMiddleware,
  handler(async (req, res) => {
    const experience = await controllers.updateExperience(res.locals.experience, req.body);
    res.send(experience);
  }),
);

router.delete(
  '/users/:userId/experiences/:experienceId',
  ownershipMiddleware,
  experienceMiddleware,
  handler(async (req, res) => {
    await controllers.deleteExperience(res.locals.experience);
    res.sendStatus(httpStatus.NO_CONTENT);
  }),
);

export default router;
