import { sectionDtoSchema } from './section.schema.js';

const postSectionsResponseSchema = sectionDtoSchema;
const patchSectionsResponseSchema = sectionDtoSchema;
const deleteSectionResponseSchema = sectionDtoSchema;

export {
    postSectionsResponseSchema,
    patchSectionsResponseSchema,
    deleteSectionResponseSchema,
};
