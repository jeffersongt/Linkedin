import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';
import createError from 'http-errors';

import db from '../../appDatabase';

/**
 * Middleware used to check if the requested experience exists in database
 * If it exists, stores it in `res.locals` to forward it to controllers
 *
 * @throws 400 - Bad request | If the route parameters are missing
 * @throws 404 - Not found | If the experience doesn't exist
 *
 * @example
 * router.get('/experience/:experienceId', experienceMiddleware, (req, res) => {
 *   const { experience } = res.locals;
 * });
 */
const experienceMiddleware = handler(async (req, res, next) => {
  const { userId, experienceId } = req.params;
  if (!userId || !experienceId) {
    next(createError(httpStatus.BAD_REQUEST, 'Missing route parameters "userId" and/or "experienceId"'));
    return;
  }

  const experience = await db.experience.findFirst({ where: { id: experienceId, userId } });
  if (!experience) {
    next(createError(httpStatus.NOT_FOUND, `Experience ${experienceId} of user ${userId} not found`));
  } else {
    res.locals.experience = experience;
    next();
  }
});

export default experienceMiddleware;
