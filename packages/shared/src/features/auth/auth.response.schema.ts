import z from 'zod';
import { userDtoSchema } from '../users/user.schema.js';

const postLoginResponseSchema = z.object({ token: z.jwt() });
const postSignupResponseSchema = userDtoSchema;
const postLoginDemoResponseSchema = postLoginResponseSchema;

export {
    postLoginResponseSchema,
    postSignupResponseSchema,
    postLoginDemoResponseSchema,
};
