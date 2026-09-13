import { z } from 'zod';
import {userShape} from '../users/user.schema.js';

const postSignupRequestBodySchema = z.object({
    username: userShape.username,
    password: userShape.password,
    name: userShape.name,
});

const postLoginRequestBodySchema = z.object({
    username: z.string(),
    password: z.string(),
});

export { postSignupRequestBodySchema, postLoginRequestBodySchema };
