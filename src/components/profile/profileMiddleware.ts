import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';
import createError from 'http-errors';

import db from '../../appDatabase';

/**
 * Middleware used to check if the requested profile exists in database
 * If it exists, stores it in `res.locals` to forward it to controllers
 *
 * @throws 400 - Bad request | If the route parameters are missing
 * @throws 404 - Not found | If the profile doesn't exist
 *
 * @example
 * router.get('/profile/:profileId', profileMiddleware, (req, res) => {
 *   const { profile } = res.locals;
 * });
 */
const profileMiddleware = handler(async (req, res, next) => {
  const { userId, profileId } = req.params;
  if (!userId || !profileId) {
    next(createError(httpStatus.BAD_REQUEST, 'Missing route parameters "userId" and/or "profileId"'));
    return;
  }

  const profile = await db.profile.findFirst({ where: { id: profileId, userId } });
  if (!profile) {
    next(createError(httpStatus.NOT_FOUND, `Profile ${profileId} of user ${userId} not found`));
  } else {
    res.locals.profile = profile;
    next();
  }
});

export default profileMiddleware;
