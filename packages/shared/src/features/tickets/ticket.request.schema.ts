import { z } from 'zod';
import { ticketShape } from './ticket.schema.js';

/* Request body */
const postTicketsRequestBodySchema = z.object({
    issueType: ticketShape.issueType,
    category: ticketShape.category,
    priority: ticketShape.priority,
    severity: ticketShape.severity,
    reproducibility: ticketShape.reproducibility,
    summary: ticketShape.summary,
    description: ticketShape.description,
    assigneeId: ticketShape.assigneeId,
});
const patchTicketsRequestBodySchema = z
    .object({
        issueType: ticketShape.issueType.optional(),
        category: ticketShape.category.optional(),
        priority: ticketShape.priority.optional(),
        severity: ticketShape.severity.optional(),
        reproducibility: ticketShape.reproducibility.optional(),
        summary: ticketShape.summary.optional(),
        description: ticketShape.description.optional(),
    })
    .refine(
        (body) => Object.values(body).some((value) => value !== undefined),
        { message: 'At least one field must be provided' }
    );
const putAssigneeRequestBodySchema = z.object({
    assigneeId: ticketShape.assigneeId.nullable(),
});

/* Request Parameters */
const ticketIdParamSchema = z.object({ ticketId: ticketShape.id });

export {
    postTicketsRequestBodySchema,
    patchTicketsRequestBodySchema,
    putAssigneeRequestBodySchema,
};
export { ticketIdParamSchema };
