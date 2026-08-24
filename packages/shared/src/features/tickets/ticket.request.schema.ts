import { z } from 'zod';
import { ticketShape } from './ticket.schema.js';

const postTicketsRequestBodySchema = z.object({
    issueType: ticketShape.issueType,
    category: ticketShape.category,
    reproducibility: ticketShape.reproducibility,
    summary: ticketShape.summary,
    description: ticketShape.description,
    priority: ticketShape.priority,
    severity: ticketShape.severity,
    assigneeId: ticketShape.assigneeId,
});

/* Request Parameters */
const ticketIdParamSchema = z.object({ ticketId: ticketShape.id });

export { postTicketsRequestBodySchema };
export { ticketIdParamSchema };
