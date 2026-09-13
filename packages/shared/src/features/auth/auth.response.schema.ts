import z from 'zod';

const postLoginResponseSchema = z.object({ token: z.jwt() });

export { postLoginResponseSchema };
