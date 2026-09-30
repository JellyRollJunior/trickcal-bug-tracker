import { z } from 'zod';
import { boardShape } from './board.schema.js';
import { sectionShape } from '../sections/section.schema.js';
import { userShape } from '../users/user.schema.js';

/* Request Body */
const postBoardsRequestBodySchema = z.object({
    name: boardShape.name,
    description: boardShape.description,
});
type PatchboardsRequestBody = z.infer<typeof patchboardsRequestBodySchema>;
const patchboardsRequestBodySchema = z
    .object({
        name: boardShape.name.optional(),
        description: boardShape.description.optional(),
    })
    .refine(
        (body) => Object.values(body).some((value) => value !== undefined),
        { message: 'At least one field must be provided' }
    );
const postBoardCollaboratorRequestBodySchema = z.object({
    collaboratorId: userShape.id,
});

/* Request Parameters */
const boardIdParamSchema = z.object({ boardId: boardShape.id });
const boardIdAndCollaboratorIdParamSchema = z.object({
    boardId: boardShape.id,
    collaboratorId: userShape.id,
});
const boardIdAndSectionIdParamSchema = z.object({
    boardId: boardShape.id,
    sectionId: sectionShape.id,
});

export type { PatchboardsRequestBody };
export {
    postBoardsRequestBodySchema,
    patchboardsRequestBodySchema,
    postBoardCollaboratorRequestBodySchema,
};
export {
    boardIdParamSchema,
    boardIdAndCollaboratorIdParamSchema,
    boardIdAndSectionIdParamSchema,
};
