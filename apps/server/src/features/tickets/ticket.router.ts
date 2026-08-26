import type { Router } from 'express';
import { requireAuth } from '@/middleware/requireAuth.js';
import { Router as CreateRouter } from 'express';
import { patchTicketsRequestBodySchema, putAssigneeRequestBodySchema } from '@trickcal-bug-tracker/shared';
import { validateRequestBody as validate } from '@/middleware/validate.js';
import * as ticketController from '@/features/tickets/ticket.controller.js';

const ticketRouter: Router = CreateRouter();

ticketRouter.patch(
    '/:ticketId',
    requireAuth,
    validate(patchTicketsRequestBodySchema),
    ticketController.patchTickets
);
ticketRouter.put(
    '/:ticketId/assignee',
    requireAuth,
    validate(putAssigneeRequestBodySchema),
    ticketController.putTicketAssignee
);
ticketRouter.delete('/:ticketId', requireAuth, ticketController.deleteTickets);

export { ticketRouter };
