import { z } from 'zod';
import * as boardSchema from '@/features/boards/board.schema.js';
import * as sectionSchema from '@/features/sections/section.schema.js';

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
