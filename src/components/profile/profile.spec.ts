/*  eslint-disable  @typescript-eslint/no-explicit-any  */

import httpStatus from 'http-status-codes';

import Requester from '../../appRequester';
import db from '../../appDatabase';
import logger from '../../appLogger';
import waitApp from '../../utils/waitApp';
import closeApp from '../../utils/closeApp';

const app = new Requester();

const user = {
  email: 'test@test.test',
  username: 'Test',
  password: 'password',
  id: '',
};

// Wait for all external services (db, redis...)
beforeAll(async () => {
  await waitApp();
});

// Gracefully terminate external services connections
afterAll(async () => {
  await closeApp();
});

// Reset session before each test, create a user and log in
beforeEach(async () => {
  logger.debug('');
  logger.debug(`Running test '${expect.getState().currentTestName}'`);

  app.resetSession();

  user.id = (await app.signup(user)).id;
  await app.signin(user);
});

// Clean db after each test
afterEach(async () => {
  await db.profile.deleteMany();
  await db.user.deleteMany();
});

function validateProfile(profile: any) {
  expect(profile.id).toBeDefined();
  expect(profile.userId).toBe(user.id);
  expect(profile.createdAt).toBeDefined();
}

test.todo('Profile');
