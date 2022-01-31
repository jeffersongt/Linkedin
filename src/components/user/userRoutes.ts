import express from 'express';
import handler from 'express-async-handler';
import httpStatus from 'http-status-codes';

import authMiddleware from '../../middlewares/authMiddleware';
import adminMiddleware from '../../middlewares/adminMiddleware';
import ownershipMiddleware from '../../middlewares/ownershipMiddleware';
import validate from '../../middlewares/validationMiddleware';

import * as controllers from './userControllers';
import userMiddleware from './userMiddleware';
import { UserSignupDto, UserSigninDto, UserUpdateDto } from './userTypes';

const router = express.Router();

/**
 * @swagger
 * /users:
 *  get:
 *    description: Use to request all users, admin only authorized
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized | If the user is not logged in
 *      '403':
 *        description: Forbidden | If the user making the request is not ADMIN
 */
router.get(
  '/users',
  adminMiddleware,
  handler(async (req, res) => {
    const users = await controllers.listUsers();
    res.send(users);
  }),
);

/**
 * @swagger
 * /users/signup:
 *  post:
 *    description: Use to signup to Linkedin
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad request | If at least one constraint is not respected
 */
router.post(
  '/users/signup',
  validate(UserSignupDto),
  handler(async (req, res) => {
    const user = await controllers.signup(req.body);
    res.status(httpStatus.CREATED).send(user);
  }),
);

/**
 * @swagger
 * /users/signin:
 *  post:
 *    description: Use to signin to Linkedin
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad request | If at least one constraint is not respected
 */
router.post(
  '/users/signin',
  validate(UserSigninDto),
  handler(async (req, res) => {
    const user = await controllers.signin(req.body);
    req.session.user = {
      id: user.id,
      role: user.role,
    };
    res.send(user);
  }),
);

/**
 * @swagger
 * /users/signout:
 *  post:
 *    description: Use to signout from Linkedin
 *    responses:
 *      '200':
 *        description: A successful response
 *      '401':
 *        description: Unauthorized | If the user is not logged in
 */
router.post(
  '/users/signout',
  authMiddleware,
  handler(async (req, res) => {
    await new Promise<void>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    res.sendStatus(httpStatus.NO_CONTENT);
  }),
);

/**
 * @swagger
 * /users/:userId:
 *  get:
 *    description: Use to request a user
 *    responses:
 *      '200':
 *        description: A successful response
 *      '400':
 *        description: Bad request | If the route parameters are missing
 *      '404':
 *        description: Not found | If the user doesn't exist
 */
router.get(
  '/users/:userId',
  userMiddleware,
  handler(async (req, res) => {
    const user = await controllers.getUser(res.locals.user);
    res.send(user);
  }),
);

/**
 * @swagger
 * /users/:userId:
 *  patch:
 *    description: Use to update a user
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
  '/users/:userId',
  validate(UserUpdateDto),
  ownershipMiddleware,
  userMiddleware,
  handler(async (req, res) => {
    const user = await controllers.updateUser(res.locals.user, req.body);
    res.send(user);
  }),
);

/**
 * @swagger
 * /users/:userId:
 *  delete:
 *    description: Use to delete a user
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
  '/users/:userId',
  ownershipMiddleware,
  userMiddleware,
  handler(async (req, res) => {
    await controllers.deleteUser(res.locals.user);
    res.sendStatus(httpStatus.NO_CONTENT);
  }),
);

export default router;
