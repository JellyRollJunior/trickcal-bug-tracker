import { z } from 'zod';

const postSectionsRequestBodySchema = z.object({
    previousSectionId: z.uuid().nullable(),
    nextSectionId: z.uuid().nullable(),
    name: z.string(),
});

export { postSectionsRequestBodySchema }