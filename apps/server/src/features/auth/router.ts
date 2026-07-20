import type { Router } from 'express';
import { Router as CreateRouter } from 'express';
import { validateRequestBody as validate } from '@/middleware/validate.js';
import { postSignupRequestBodySchema as signupSchema, postLoginRequestBodySchema as loginSchema } from '@/features/auth/requestBody.schema.js';
import * as authController from '@/features/auth/controller.js';

const authRouter: Router = CreateRouter();

authRouter.post('/signup', validate(signupSchema), authController.postSignup);
authRouter.post('/login', validate(loginSchema), authController.postLogin);

export { authRouter };
