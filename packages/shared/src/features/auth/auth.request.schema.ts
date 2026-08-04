import { z } from 'zod';
import {userShape} from '../users/user.schema.js';

const postSignupRequestBodySchema = z.object({
    username: userShape.username,
    password: userShape.password,
    name: userShape.name,
});

const postLoginRequestBodySchema = z.object({
    username: z.string().min(1).max(50),
    password: z.string().min(8).max(128),
});

export { postSignupRequestBodySchema, postLoginRequestBodySchema };
