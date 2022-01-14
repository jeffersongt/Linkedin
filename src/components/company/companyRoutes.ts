import express from 'express';
import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';

import ownershipMiddleware from '../../middlewares/ownershipMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';
import validate from '../../middlewares/validationMiddleware';

import companyMiddleware from './companyMiddleware';
import * as controllers from './companyControllers';
import { CompanyCreateDto, CompanyUpdateDto } from './companyTypes';

const router = express.Router();

router.get(
  '/users/:userId/companies',
  authMiddleware,
  handler(async (req, res) => {
    const companies = await controllers.listCompanies(req.params.userId);
    res.send(companies);
  }),
);

router.post(
  '/users/:userId/companies',
  validate(CompanyCreateDto),
  ownershipMiddleware,
  handler(async (req, res) => {
    const company = await controllers.createNewCompany(req.body);
    res.status(httpStatus.CREATED).send(company);
  }),
);

router.get(
  '/users/:userId/companies/:companyId',
  authMiddleware,
  companyMiddleware,
  handler(async (req, res) => {
    const company = await controllers.getCompany(res.locals.company);
    res.send(company);
  }),
);

router.patch(
  '/users/:userId/companies/:companyId',
  validate(CompanyUpdateDto),
  ownershipMiddleware,
  companyMiddleware,
  handler(async (req, res) => {
    const company = await controllers.updateCompany(res.locals.company, req.body);
    res.send(company);
  }),
);

router.delete(
  '/users/:userId/companies/:companyId',
  ownershipMiddleware,
  companyMiddleware,
  handler(async (req, res) => {
    await controllers.deleteCompany(res.locals.company);
    res.sendStatus(httpStatus.NO_CONTENT);
  }),
);

export default router;
