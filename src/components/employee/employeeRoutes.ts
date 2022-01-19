import express from 'express';
import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';

import ownershipMiddleware from '../../middlewares/ownershipMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';
import validate from '../../middlewares/validationMiddleware';

import employeeMiddleware from './employeeMiddleware';
import * as controllers from './employeeControllers';
import { EmployeeCreateDto, EmployeeUpdateDto } from './employeeTypes';

const router = express.Router();

router.get(
  '/users/:userId/companies/:companyId/employees',
  authMiddleware,
  handler(async (req, res) => {
    const employees = await controllers.listEmployees(req.params.userId, req.params.companyId);
    res.send(employees);
  }),
);

router.post(
  '/users/:userId/companies/:companyId/employees',
  validate(EmployeeCreateDto),
  ownershipMiddleware,
  handler(async (req, res) => {
    const employee = await controllers.createNewEmployee(req.params.userId, req.params.companyId, req.body);
    res.status(httpStatus.CREATED).send(employee);
  }),
);

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
