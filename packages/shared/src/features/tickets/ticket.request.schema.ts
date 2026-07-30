import { z } from 'zod';
import { ticketSchema } from './ticket.schema.js';

const postTicketsRequestBodySchema = z.object({
    issueType: ticketSchema.issueType,
    category: ticketSchema.category,
    reproducibility: ticketSchema.reproducibility,
    summary: ticketSchema.summary,
    description: ticketSchema.description,
    priority: ticketSchema.priority,
    severity: ticketSchema.severity,
    assigneeId: ticketSchema.assigneeId,
});

export { postTicketsRequestBodySchema };
