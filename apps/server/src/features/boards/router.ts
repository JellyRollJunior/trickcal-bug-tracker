import type { Router } from 'express';
import { Router as CreateRouter } from 'express';
import { requireAuth } from '@/middleware/requireAuth.js';
import * as boardController from '@/features/boards/controller.js';

const boardRouter: Router = CreateRouter();

boardRouter.post('/', requireAuth, boardController.postBoard)

export { boardRouter };
