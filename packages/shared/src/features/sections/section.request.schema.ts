import { z } from 'zod';
import { sectionShape } from './section.schema';

/* Request Body */
const postSectionsRequestBodySchema = z.object({
    previousSectionId: sectionShape.id.nullable(),
    name: sectionShape.name,
});

/* Request Paramters */
const sectionIdParamSchema = z.object({
    sectionId: sectionShape.id,
});

export { postSectionsRequestBodySchema };
export { sectionIdParamSchema };
