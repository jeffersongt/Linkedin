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

/**
 * @swagger
 * /users/:userId/companies:
 *  get:
 *    description: Use to get all companies linked to a profile
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized | If the user is not logged in
 */
router.get(
  '/users/:userId/companies',
  authMiddleware,
  handler(async (req, res) => {
    const companies = await controllers.listCompanies(req.params.userId);
    res.send(companies);
  }),
);

/**
 * @swagger
 * /users/:userId/companies:
 *  post:
 *    description: Use to add a company
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
  '/users/:userId/companies',
  validate(CompanyCreateDto),
  ownershipMiddleware,
  handler(async (req, res) => {
    const company = await controllers.createNewCompany(req.params.userId, req.body);
    res.status(httpStatus.CREATED).send(company);
  }),
);

/**
 * @swagger
 * /users/:userId/companies/:companyId:
 *  get:
 *    description: Use to get a company linked to a profile
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad request | If the route parameters are missing
 *      '401':
 *        description: Unauthorized | If not logged in
 *      '404':
 *        description: Not found | If the experience doesn't exist
 */
router.get(
  '/users/:userId/companies/:companyId',
  authMiddleware,
  companyMiddleware,
  handler(async (req, res) => {
    const company = await controllers.getCompany(res.locals.company);
    res.send(company);
  }),
);

/**
 * @swagger
 * /users/:userId/companies/:companyId:
 *  patch:
 *    description: Use to update an company
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad request | If the route parameters are missing || Bad request | If at least one constraint is not respected
 *      '401':
 *        description: Unauthorized | If not logged in
 *      '403':
 *        description: Forbidden | If the user making the request is not allowed to
 *      '404':
 *        description: Not found | If the user doesn't exist 
 */
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

/**
 * @swagger
 * /users/:userId/companies/:companyId:
 *  delete:
 *    description: Use to delete a company
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
  '/users/:userId/companies/:companyId',
  ownershipMiddleware,
  companyMiddleware,
  handler(async (req, res) => {
    await controllers.deleteCompany(res.locals.company);
    res.sendStatus(httpStatus.NO_CONTENT);
  }),
);

export default router;
