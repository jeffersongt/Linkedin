import express from 'express';
import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';

import ownershipMiddleware from '../../middlewares/ownershipMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';
import validate from '../../middlewares/validationMiddleware';

import employeeMiddleware from './employeeMiddleware';
import * as controllers from './employeeControllers';
import { EmployeeCreateDto } from './employeeTypes';

const router = express.Router();

/**
 * @swagger
 * /users/:userId/companies/:companyId/employees:
 *  get:
 *    description: Use to get all employees linked to a company
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized | If the user is not logged in
 */
router.get(
  '/users/:userId/companies/:companyId/employees',
  authMiddleware,
  handler(async (req, res) => {
    const employees = await controllers.listEmployees(req.params.userId, req.params.companyId);
    res.send(employees);
  }),
);

/**
 * @swagger
 * /users/:userId/companies/:companyId/employees:
 *  post:
 *    description: Use to add an employee to a company
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
  '/users/:userId/companies/:companyId/employees',
  validate(EmployeeCreateDto),
  ownershipMiddleware,
  handler(async (req, res) => {
    const employee = await controllers.createNewEmployee(req.params.userId, req.params.companyId, req.body);
    res.status(httpStatus.CREATED).send(employee);
  }),
);

/**
 * @swagger
 * /users/:userId/companies/:companyId/employees/:employeeId:
 *  delete:
 *    description: Use to delete an employee from a company
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
  '/users/:userId/companies/:companyId/employees/:employeeId',
  ownershipMiddleware,
  employeeMiddleware,
  handler(async (req, res) => {
    await controllers.deleteEmployee(res.locals.employee);
    res.sendStatus(httpStatus.NO_CONTENT);
  }),
);

export default router;
