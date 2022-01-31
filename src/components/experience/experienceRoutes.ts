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

/**
 * @swagger
 * /users/:userId/experiences:
 *  get:
 *    description: Use to get all experiences linked to a profile
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized | If the user is not logged in
 */
router.get(
  '/users/:userId/experiences',
  authMiddleware,
  handler(async (req, res) => {
    const experiences = await controllers.listExperiences(req.params.userId);
    res.send(experiences);
  }),
);

/**
 * @swagger
 * /users/:userId/experiences:
 *  post:
 *    description: Use to add an experience to a profile
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad request | If the route parameters are missing || Bad request | If at least one constraint is not respected
 *      '401':
 *        description: Unauthorized | If not logged in
 *      '403':
 *        description: Forbidden | If the user making the request is not allowed to
 */
router.post(
  '/users/:userId/experiences',
  validate(ExperienceCreateDto),
  ownershipMiddleware,
  handler(async (req, res) => {
    const experience = await controllers.createNewExperience(req.params.userId, req.body);
    res.status(httpStatus.CREATED).send(experience);
  }),
);

/**
 * @swagger
 * /users/:userId/experiences/:experienceId:
 *  get:
 *    description: Use to get an experience linked to a profile
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad request | If the route parameters are missing
 *      '401':
 *        description: Unauthorized | If not logged in
 *      '404':
 *        description: Not found | If the experience doesn't exist
 */
router.get(
  '/users/:userId/experiences/:experienceId',
  authMiddleware,
  experienceMiddleware,
  handler(async (req, res) => {
    const experience = await controllers.getExperience(res.locals.experience);
    res.send(experience);
  }),
);

/**
 * @swagger
 * /users/:userId/experiences/:experienceId:
 *  patch:
 *    description: Use to update an experience
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad request | If the route parameters are missing || Bad request | If at least one constraint is not respected
 *      '401':
 *        description: Unauthorized | If not logged in
 *      '403':
 *        description: Forbidden | If the user making the request is not allowed to
 *      '404':
 *        description: Not found | If the user doesn't exist 
 */
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

/**
 * @swagger
 * /users/:userId/experiences/:experienceId:
 *  delete:
 *    description: Use to delete an experience
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad request | If the route parameters are missing
 *      '401':
 *        description: Unauthorized | If not logged in
 *      '403':
 *        description: Forbidden | If the user making the request is not allowed to
 *      '404':
 *        description: Not found | If the user doesn't exist
 */
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
