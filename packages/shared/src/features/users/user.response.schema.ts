import { z } from 'zod';
import { userDtoSchema } from './user.schema.js';

type GetMeResponse = z.infer<typeof getMeResponseSchema>;
const getMeResponseSchema = userDtoSchema;

export type { GetMeResponse };
export { getMeResponseSchema };
