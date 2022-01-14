import session from 'express-session';
import { Role } from '@prisma/client';

import { config, MODES } from './appConfig';
import store from './appStore';

declare module 'express-session' {
  interface SessionData {
    user: { id: string; role: Role };
  }
}

export default session({
  secret: config.sessionSecret,
  cookie: { httpOnly: true, secure: config.mode === MODES.PROD },
  resave: false,
  saveUninitialized: true,
  store,
});
