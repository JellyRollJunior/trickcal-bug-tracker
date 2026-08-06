import { z } from 'zod';
import { boardShape } from './board.schema.js';
import { sectionShape } from '../sections/section.schema.js';

/* Request Body */
const postBoardsRequestBodySchema = z.object({
    name: boardShape.name,
    description: boardShape.description,
});
const patchboardsRequestBodySchema = z.object({
    name: boardShape.name.optional(),
    description: boardShape.description.optional(),
});

/* Request Parameters */
const boardIdParamSchema = z.object({ boardId: boardShape.id });
const boardIdAndSectionIdParamSchema = z.object({
    boardId: boardShape.id,
    sectionId: sectionShape.id,
});

export { postBoardsRequestBodySchema, patchboardsRequestBodySchema };
export { boardIdParamSchema, boardIdAndSectionIdParamSchema };
