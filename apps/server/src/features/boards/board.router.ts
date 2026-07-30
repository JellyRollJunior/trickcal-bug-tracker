import type { Router } from 'express';
import { Router as CreateRouter } from 'express';
import { requireAuth } from '@/middleware/requireAuth.js';
import { validateRequestBody as validate } from '@/middleware/validate.js';
import { postBoardsRequestBodySchema as postBoardsSchema } from '@/features/boards/board.request.schema.js';
import { postSectionsRequestBodySchema as postSectionsSchema } from '@/features/sections/section.request-body.schema.js';
import { postTicketsRequestBodySchema as postTicketsSchema } from '@/features/tickets/ticket.request-body.schema.js';
import * as boardController from '@/features/boards/board.controller.js';
import * as sectionController from '@/features/sections/section.controller.js';
import * as ticketController from '@/features/tickets/ticket.controller.js';

const boardRouter: Router = CreateRouter();

boardRouter.get('/', requireAuth, boardController.getBoards);
boardRouter.post(
    '/',
    requireAuth,
    validate(postBoardsSchema),
    boardController.postBoards
);
boardRouter.get('/:boardId', requireAuth, boardController.getBoard);

/* sections */
boardRouter.post(
    '/:boardId/sections',
    requireAuth,
    validate(postSectionsSchema),
    sectionController.postSections
);

/* tickets */
boardRouter.post(
    '/:boardId/sections/:sectionId/tickets',
    requireAuth,
    validate(postTicketsSchema),
    ticketController.postTickets
);

export { boardRouter };
