import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';
import createError from 'http-errors';

import db from '../../appDatabase';

/**
 * Middleware used to check if the requested company exists in database
 * If it exists, stores it in `res.locals` to forward it to controllers
 *
 * @throws 400 - Bad request | If the route parameters are missing
 * @throws 404 - Not found | If the company doesn't exist
 *
 * @example
 * router.get('/company/:companyId', companyMiddleware, (req, res) => {
 *   const { company } = res.locals;
 * });
 */
const companyMiddleware = handler(async (req, res, next) => {
  const { userId, companyId } = req.params;
  if (!userId || !companyId) {
    next(createError(httpStatus.BAD_REQUEST, 'Missing route parameters "userId" and/or "companyId"'));
    return;
  }

  const company = await db.company.findFirst({ where: { id: companyId } });
  if (!company) {
    next(createError(httpStatus.NOT_FOUND, `Company ${companyId} of user ${userId} not found`));
  } else {
    res.locals.company = company;
    next();
  }
});

export default companyMiddleware;
