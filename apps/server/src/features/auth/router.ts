import type { Router } from 'express';
import { Router as CreateRouter } from 'express';
import * as authController from '@/features/auth/controller.js';

const authRouter: Router = CreateRouter();

authRouter.post('/signup', authController.postSignup);

export { authRouter }