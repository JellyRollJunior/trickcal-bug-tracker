import { z } from 'zod';
import * as userSchemas from '@/features/users/schema.js';

const postSignupRequestBodySchema = z.object({
    username: userSchemas.usernameSchema,
    password: userSchemas.passwordSchema,
    name: userSchemas.nameSchema,
});

const postLoginRequestBodySchema = z.object({
    username: z.string().min(1).max(50),
    password: z.string().min(8).max(128),
});

export { postSignupRequestBodySchema, postLoginRequestBodySchema };
