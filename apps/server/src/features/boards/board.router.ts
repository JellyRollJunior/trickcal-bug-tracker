import type { Router } from 'express';
import { Router as CreateRouter } from 'express';
import { requireAuth } from '@/middleware/requireAuth.js';
import { validateRequestBody as validate } from '@/middleware/validate.js';
import {
    patchboardsRequestBodySchema,
    postBoardsRequestBodySchema as postBoardsSchema,
    postSectionsRequestBodySchema as postSectionsSchema,
    postTicketsRequestBodySchema as postTicketsSchema,
    postBoardCollaboratorRequestBodySchema as postBoardCollaboratorSchema,
    deleteBoardCollaboratorRequestBodySchema as deleteBoardCollaboratorSchema,
} from '@trickcal-bug-tracker/shared';
import * as boardController from '@/features/boards/board.controller.js';
import * as sectionController from '@/features/sections/section.controller.js';
import * as ticketController from '@/features/tickets/ticket.controller.js';

const boardRouter: Router = CreateRouter();

/* boards */
boardRouter.get('/', requireAuth, boardController.getBoards);
boardRouter.post('/', requireAuth, validate(postBoardsSchema), boardController.postBoards);
boardRouter.get('/:boardId', requireAuth, boardController.getBoard);
boardRouter.patch('/:boardId', requireAuth, validate(patchboardsRequestBodySchema), boardController.patchBoard);
boardRouter.delete('/:boardId', requireAuth, boardController.deleteBoard);
boardRouter.post('/:boardId/collaborators', requireAuth, validate(postBoardCollaboratorSchema), boardController.postBoardCollaborator);
boardRouter.delete('/:boardId/collaborators', requireAuth, validate(deleteBoardCollaboratorSchema), boardController.deleteBoardCollaborator);

/* sections */
boardRouter.post('/:boardId/sections', requireAuth, validate(postSectionsSchema), sectionController.postSections);

/* tickets */
boardRouter.post('/:boardId/sections/:sectionId/tickets', requireAuth, validate(postTicketsSchema), ticketController.postTickets);

export { boardRouter };
