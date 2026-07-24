import type { Router } from 'express';
import { Router as CreateRouter } from 'express';
import { requireAuth } from '@/middleware/requireAuth.js';
import { validateRequestBody as validate } from '@/middleware/validate.js';
import {
    postBoardsRequestBodySchema as postBoardsSchema,
    postSectionsRequestBodySchema as postSectionsSchema,
} from '@/features/boards/requestBody.schema.js';
import * as boardController from '@/features/boards/board.controller.js';
import * as sectionController from '@/features/boards/section.controller.js';

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
    sectionController.postSection
);

export { boardRouter };
