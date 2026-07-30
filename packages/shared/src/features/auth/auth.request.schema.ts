import { z } from 'zod';
import {userSchema} from '../users/user.schema.js';

const postSignupRequestBodySchema = z.object({
    username: userSchema.username,
    password: userSchema.password,
    name: userSchema.name,
});

const postLoginRequestBodySchema = z.object({
    username: z.string().min(1).max(50),
    password: z.string().min(8).max(128),
});

export { postSignupRequestBodySchema, postLoginRequestBodySchema };
