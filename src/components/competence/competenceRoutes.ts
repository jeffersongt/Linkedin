import express from 'express';
import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';

import ownershipMiddleware from '../../middlewares/ownershipMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';
import validate from '../../middlewares/validationMiddleware';

import competenceMiddleware from './competenceMiddleware';
import * as controllers from './competenceControllers';
import { CompetenceCreateDto } from './competenceTypes';

const router = express.Router();

/**
 * @swagger
 * /users/:userId/competences:
 *  get:
 *    description: Use to get every competences linked to a profile
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized | If the user is not logged in
 */
router.get(
  '/users/:userId/competences',
  authMiddleware,
  handler(async (req, res) => {
    const competences = await controllers.listCompetences(req.params.userId);
    res.send(competences);
  }),
);

/**
 * @swagger
 * /users/:userId/competences:
 *  post:
 *    description: Use to add a competence to a profile
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
  '/users/:userId/competences',
  validate(CompetenceCreateDto),
  ownershipMiddleware,
  handler(async (req, res) => {
    const competence = await controllers.createNewCompetence(req.params.userId, req.body);
    res.status(httpStatus.CREATED).send(competence);
  }),
);

/**
 * @swagger
 * /users/:userId/competences/:competenceId:
 *  get:
 *    description: Use to get a competence linked to a profile
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
  '/users/:userId/competences/:competenceId',
  authMiddleware,
  competenceMiddleware,
  handler(async (req, res) => {
    const competence = await controllers.getCompetence(res.locals.competence);
    res.send(competence);
  }),
);

/**
 * @swagger
 * /users/:userId/competences/:competenceId:
 *  delete:
 *    description: Use to delete a competence
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
  '/users/:userId/competences/:competenceId',
  ownershipMiddleware,
  competenceMiddleware,
  handler(async (req, res) => {
    await controllers.deleteCompetence(res.locals.competence);
    res.sendStatus(httpStatus.NO_CONTENT);
  }),
);

export default router;
