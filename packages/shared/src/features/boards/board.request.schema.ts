import { z } from 'zod';
import { boardShape } from './board.schema.js';
import { sectionShape } from '../sections/section.schema.js';
import { userShape } from '../users/user.schema.js';
import { ticketShape } from '../tickets/ticket.schema.js';

/* Request Body */
const postBoardsRequestBodySchema = z.object({
    name: boardShape.name,
    description: boardShape.description,
});
const patchboardsRequestBodySchema = z.object({
    name: boardShape.name.optional(),
    description: boardShape.description.optional(),
});
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
const boardIdAndTicketIdParamSchema = z.object({
    boardId: boardShape.id,
    ticketId: ticketShape.id,
})

export {
    postBoardsRequestBodySchema,
    patchboardsRequestBodySchema,
    postBoardCollaboratorRequestBodySchema,
};
export {
    boardIdParamSchema,
    boardIdAndCollaboratorIdParamSchema,
    boardIdAndSectionIdParamSchema,
    boardIdAndTicketIdParamSchema,
};
