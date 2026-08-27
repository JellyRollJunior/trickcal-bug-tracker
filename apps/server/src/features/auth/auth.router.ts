import type { Router } from 'express';
import { Router as CreateRouter } from 'express';
import { validateRequestBody as validate } from '@/middleware/validate.js';
import {
    postSignupRequestBodySchema as signupSchema,
    postLoginRequestBodySchema as loginSchema,
} from '@trickcal-bug-tracker/shared';
import { passport } from '@/features/auth/passport/passport.js';
import * as authController from '@/features/auth/auth.controller.js';

const authRouter: Router = CreateRouter();

authRouter.post('/signup', validate(signupSchema), authController.postSignup);
authRouter.post('/login', validate(loginSchema), authController.postLogin);
authRouter.get('/github', passport.authenticate('github'));
authRouter.get('/github/callback', authController.getGithubCallback);
authRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }));
authRouter.get('/google/callback', authController.getGoogleCallback);

export { authRouter };
