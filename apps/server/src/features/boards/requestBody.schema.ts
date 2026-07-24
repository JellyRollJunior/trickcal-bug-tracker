import { z } from 'zod';

const postBoardsRequestBodySchema = z.object({
    name: z.string(),
    description: z.string(),
});

const postSectionsRequestBodySchema = z.object({
    order: z.string(),
    name: z.string(),
})

export { postBoardsRequestBodySchema, postSectionsRequestBodySchema };
