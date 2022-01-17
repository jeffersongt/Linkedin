import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';
import createError from 'http-errors';

import db from '../../appDatabase';

/**
 * Middleware used to check if the requested employee exists in database
 * If it exists, stores it in `res.locals` to forward it to controllers
 *
 * @throws 400 - Bad request | If the route parameters are missing
 * @throws 404 - Not found | If the employee doesn't exist
 *
 * @example
 * router.get('/employee/:employeeId', employeeMiddleware, (req, res) => {
 *   const { employee } = res.locals;
 * });
 */
const employeeMiddleware = handler(async (req, res, next) => {
  const { userId, employeeId } = req.params;
  if (!userId || !employeeId) {
    next(createError(httpStatus.BAD_REQUEST, 'Missing route parameters "userId" and/or "employeeId"'));
    return;
  }

  const employee = await db.employee.findFirst({ where: { id: employeeId, userId } });
  if (!employee) {
    next(createError(httpStatus.NOT_FOUND, `Employee ${employeeId} of user ${userId} not found`));
  } else {
    res.locals.employee = employee;
    next();
  }
});

export default employeeMiddleware;
