import { z } from 'zod';

const postBoardsRequestBodySchema = z.object({
    name: z.string(),
    description: z.string(),
});

const postSectionsRequestBodySchema = z.object({
    previousSectionId: z.uuid(),
    nextSectionId: z.uuid(),
    name: z.string(),
})

export { postBoardsRequestBodySchema, postSectionsRequestBodySchema };
