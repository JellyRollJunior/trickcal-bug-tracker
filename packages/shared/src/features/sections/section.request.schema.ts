import { z } from 'zod';
import { sectionShape } from './section.schema.js';

/* Request Body */
const postSectionsRequestBodySchema = z.object({
    previousSectionId: sectionShape.id.nullable(),
    name: sectionShape.name,
});
type PostSectionsRequestBody = z.infer<typeof postSectionsRequestBodySchema>;

const patchSectionsRequestBodySchema = z.object({
    name: sectionShape.name,
});
type PatchSectionsRequestBody = z.infer<typeof patchSectionsRequestBodySchema>;

/* Request Paramters */
const sectionIdParamSchema = z.object({
    sectionId: sectionShape.id,
});

export type { PostSectionsRequestBody, PatchSectionsRequestBody };
export { postSectionsRequestBodySchema, patchSectionsRequestBodySchema };
export { sectionIdParamSchema };
