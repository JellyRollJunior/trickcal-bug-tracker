import { z } from 'zod';

const postBoardsRequestBodySchema = z.object({
    name: z.string(),
    description: z.string(),
});

export { postBoardsRequestBodySchema };
