import express from 'express';
import { authSchemas } from '../schemas/user.js';
import validateBody from '../middlewares/validateBody.js';

import {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} from '../controllers/auth.js';

import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

const authRouter = express.Router();

authRouter.post(
  '/register',
  validateBody(authSchemas.registerSchema),
  register
);

authRouter.post('/login', validateBody(authSchemas.loginSchema), login);

authRouter.get('/current', authenticate, getCurrent);

authRouter.post('/logout', authenticate, logout);

authRouter.patch(
  '/',
  authenticate,
  validateBody(authSchemas.updateSubscriptionSchema),
  updateSubscription
);

authRouter.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  updateAvatar
);

export default authRouter;
