import z from 'zod';
import { CATEGORY, ISSUE_TYPE, PRIORITY, SEVERITY } from './ticket.enums.js';

const ticketSchema = {
    id: z.uuid(),
    name: z.string(),
    issueType: z.enum(ISSUE_TYPE),
    category: z.enum(CATEGORY),
    reproducibility: z.boolean(),
    summary: z.string(),
    description: z.string(),
    priority: z.enum(PRIORITY),
    severity: z.enum(SEVERITY),
    assigneeId: z.uuid().nullable(),
};

export { ticketSchema };
