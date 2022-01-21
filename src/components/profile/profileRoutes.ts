import express from 'express';
import handler from 'express-async-handler';

import ownershipMiddleware from '../../middlewares/ownershipMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';
import validate from '../../middlewares/validationMiddleware';

import profileMiddleware from './profileMiddleware';
import * as controllers from './profileControllers';
import { ProfileUpdateDto } from './profileTypes';

const router = express.Router();

router.get(
  '/users/:userId/profiles',
  authMiddleware,
  handler(async (req, res) => {
    const profiles = await controllers.listProfiles(req.params.userId);
    res.send(profiles);
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

export default router;
