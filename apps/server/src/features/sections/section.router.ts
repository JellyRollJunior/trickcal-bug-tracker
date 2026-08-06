import { requireAuth } from '@/middleware/requireAuth.js';
import type { Router } from 'express';
import { Router as CreateRouter } from 'express';
import * as sectionController from '@/features/sections/section.controller.js';

const sectionRouter: Router = CreateRouter();

sectionRouter.patch('/:sectionId', requireAuth, sectionController.patchSection)

export { sectionRouter }