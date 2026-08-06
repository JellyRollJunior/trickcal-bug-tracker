import type { Router } from 'express';
import { requireAuth } from '@/middleware/requireAuth.js';
import { Router as CreateRouter } from 'express';
import { patchSectionsRequestBodySchema } from '@trickcal-bug-tracker/shared';
import { validateRequestBody as validate } from '@/middleware/validate.js';
import * as sectionController from '@/features/sections/section.controller.js';

const sectionRouter: Router = CreateRouter();

sectionRouter.patch(
    '/:sectionId',
    requireAuth,
    validate(patchSectionsRequestBodySchema),
    sectionController.patchSection
);
sectionRouter.delete(
    '/:sectionId',
    requireAuth,
    sectionController.deleteSection
);

export { sectionRouter };
