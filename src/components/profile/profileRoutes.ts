import express from 'express';
import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';

import ownershipMiddleware from '../../middlewares/ownershipMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';
import validate from '../../middlewares/validationMiddleware';

import profileMiddleware from './profileMiddleware';
import * as controllers from './profileControllers';
import { ProfileCreateDto, ProfileUpdateDto } from './profileTypes';

const router = express.Router();

router.get(
  '/users/:userId/profiles',
  authMiddleware,
  handler(async (req, res) => {
    const profiles = await controllers.listProfiles(req.params.userId);
    res.send(profiles);
  }),
);

router.post(
  '/users/:userId/profiles',
  validate(ProfileCreateDto),
  ownershipMiddleware,
  handler(async (req, res) => {
    const profile = await controllers.createNewProfile(req.params.userId, req.body);
    res.status(httpStatus.CREATED).send(profile);
  }),
);

router.get(
  '/users/:userId/profiles/:profileId',
  authMiddleware,
  profileMiddleware,
  handler(async (req, res) => {
    const profile = await controllers.getProfile(res.locals.profile);
    res.send(profile);
  }),
);

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

router.delete(
  '/users/:userId/profiles/:profileId',
  ownershipMiddleware,
  profileMiddleware,
  handler(async (req, res) => {
    await controllers.deleteProfile(res.locals.profile);
    res.sendStatus(httpStatus.NO_CONTENT);
  }),
);

export default router;
