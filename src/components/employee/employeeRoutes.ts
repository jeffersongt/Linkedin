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
  '/users/:userId/employees',
  authMiddleware,
  handler(async (req, res) => {
    const employees = await controllers.listEmployees(req.params.userId);
    res.send(employees);
  }),
);

router.post(
  '/users/:userId/employees',
  validate(EmployeeCreateDto),
  ownershipMiddleware,
  handler(async (req, res) => {
    const employee = await controllers.createNewEmployee(req.params.userId, req.body);
    res.status(httpStatus.CREATED).send(employee);
  }),
);

router.get(
  '/users/:userId/employees/:employeeId',
  authMiddleware,
  employeeMiddleware,
  handler(async (req, res) => {
    const employee = await controllers.getEmployee(res.locals.employee);
    res.send(employee);
  }),
);

router.patch(
  '/users/:userId/employees/:employeeId',
  validate(EmployeeUpdateDto),
  ownershipMiddleware,
  employeeMiddleware,
  handler(async (req, res) => {
    const employee = await controllers.updateEmployee(res.locals.employee, req.body);
    res.send(employee);
  }),
);

router.delete(
  '/users/:userId/employees/:employeeId',
  ownershipMiddleware,
  employeeMiddleware,
  handler(async (req, res) => {
    await controllers.deleteEmployee(res.locals.employee);
    res.sendStatus(httpStatus.NO_CONTENT);
  }),
);

export default router;
