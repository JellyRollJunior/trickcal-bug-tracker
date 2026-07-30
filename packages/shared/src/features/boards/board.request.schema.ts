import { z } from 'zod';
import { boardSchema } from './board.schema.js';
import { sectionSchema } from '../sections/section.schema.js';

/* Request Body */
const postBoardsRequestBodySchema = z.object({
    name: boardSchema.name,
    description: boardSchema.description,
});

/* Request Parameters */
const boardIdParamSchema = z.object({ boardId: boardSchema.id });
const boardIdAndSectionIdParamSchema = z.object({
    boardId: boardSchema.id,
    sectionId: sectionSchema.id,
});

export { postBoardsRequestBodySchema };
export { boardIdParamSchema, boardIdAndSectionIdParamSchema };
