import express from 'express';
import handler from 'express-async-handler';

import ownershipMiddleware from '../../middlewares/ownershipMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';
import validate from '../../middlewares/validationMiddleware';

import profileMiddleware from './profileMiddleware';
import * as controllers from './profileControllers';
import { ProfileUpdateDto } from './profileTypes';

const router = express.Router();

/**
 * @swagger
 * /users/:userId/profiles:
 *  get:
 *    description: Use to request all profiles
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized | If the user is not logged in
 */
router.get(
  '/users/:userId/profiles',
  authMiddleware,
  handler(async (req, res) => {
    const profiles = await controllers.listProfiles(req.params.userId);
    res.send(profiles);
  }),
);

/**
 * @swagger
 * /users/:userId/profiles/:profileId:
 *  patch:
 *    description: Use to modify a profile
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
  '/users/:userId/profiles/:profileId',
  validate(ProfileUpdateDto),
  ownershipMiddleware,
  profileMiddleware,
  handler(async (req, res) => {
    const profile = await controllers.updateProfile(res.locals.profile, req.body);
    res.send(profile);
  }),
);

export default router;
