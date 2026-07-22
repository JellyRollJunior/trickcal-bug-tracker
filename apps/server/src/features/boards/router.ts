import type { Router } from 'express';
import { Router as CreateRouter } from 'express';
import { requireAuth } from '@/middleware/requireAuth.js';
import { validateRequestBody as validate } from '@/middleware/validate.js';
import { postBoardsRequestBodySchema as postBoardsSchema } from '@/features/boards/requestBody.schema.js';
import * as boardController from '@/features/boards/controller.js';

const boardRouter: Router = CreateRouter();

boardRouter.post(
    '/',
    validate(postBoardsSchema),
    requireAuth,
    boardController.postBoard
);

export { boardRouter };
