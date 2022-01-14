import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';
import createError from 'http-errors';

import db from '../../appDatabase';

/**
 * Middleware used to check if the requested competence exists in database
 * If it exists, stores it in `res.locals` to forward it to controllers
 *
 * @throws 400 - Bad request | If the route parameters are missing
 * @throws 404 - Not found | If the competence doesn't exist
 *
 * @example
 * router.get('/competence/:competenceId', competenceMiddleware, (req, res) => {
 *   const { competence } = res.locals;
 * });
 */
const competenceMiddleware = handler(async (req, res, next) => {
  const { userId, competenceId } = req.params;
  if (!userId || !competenceId) {
    next(createError(httpStatus.BAD_REQUEST, 'Missing route parameters "userId" and/or "competenceId"'));
    return;
  }

  const competence = await db.competence.findFirst({ where: { id: competenceId, userId } });
  if (!competence) {
    next(createError(httpStatus.NOT_FOUND, `Competence ${competenceId} of user ${userId} not found`));
  } else {
    res.locals.competence = competence;
    next();
  }
});

export default competenceMiddleware;
