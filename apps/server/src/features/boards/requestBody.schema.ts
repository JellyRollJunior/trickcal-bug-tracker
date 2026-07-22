import { z } from 'zod';

const postBoardsRequestBodySchema = z.object({
    ownerId: z.uuid(),
    name: z.string(),
    description: z.string(),
});

export { postBoardsRequestBodySchema };
