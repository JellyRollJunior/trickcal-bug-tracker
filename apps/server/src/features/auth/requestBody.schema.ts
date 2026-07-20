import { z } from 'zod';
import * as userSchemas from '@/features/users/schema.js';

const postSignupRequestBodySchema = z.object({
    username: userSchemas.usernameSchema,
    password: userSchemas.passwordSchema,
    name: userSchemas.nameSchema,
});

export { postSignupRequestBodySchema };
