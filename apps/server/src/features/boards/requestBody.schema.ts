import { z } from 'zod';

const postBoardsRequestBodySchema = z.object({
    name: z.string(),
    description: z.string(),
});

const postSectionsRequestBodySchema = z.object({
    previousSectionId: z.uuid().nullable(),
    nextSectionId: z.uuid().nullable(),
    name: z.string(),
})

export { postBoardsRequestBodySchema, postSectionsRequestBodySchema };
