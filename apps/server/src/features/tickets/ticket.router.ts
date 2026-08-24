import type { Router } from 'express';
import { requireAuth } from '@/middleware/requireAuth.js';
import { Router as CreateRouter } from 'express';
import * as ticketController from '@/features/tickets/ticket.controller.js';

const ticketRouter: Router = CreateRouter();

ticketRouter.delete('/:ticketId', requireAuth, ticketController.deleteTickets);

export { ticketRouter };
