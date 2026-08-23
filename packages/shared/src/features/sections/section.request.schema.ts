import { z } from 'zod';
import { sectionShape } from './section.schema.js';

/* Request Body */
const postSectionsRequestBodySchema = z.object({
    previousSectionId: sectionShape.id.nullable(),
    name: sectionShape.name,
});
const patchSectionsRequestBodySchema = z.object({
    name: sectionShape.name.optional(),
});

/* Request Paramters */
const sectionIdParamSchema = z.object({
    sectionId: sectionShape.id,
});

export { postSectionsRequestBodySchema, patchSectionsRequestBodySchema };
export { sectionIdParamSchema };
