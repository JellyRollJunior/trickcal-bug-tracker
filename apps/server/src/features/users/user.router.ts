import { Router as CreateRouter, type Router } from 'express';
import { requireAuth } from '@/middleware/requireAuth.js';
import * as userController from '@/features/users/user.controller.js';

const userRouter: Router = CreateRouter();

userRouter.get('/me', requireAuth, userController.getMe);

export { userRouter };
