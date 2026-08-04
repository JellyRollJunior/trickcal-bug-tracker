import z from 'zod';
import { CATEGORY, ISSUE_TYPE, PRIORITY, SEVERITY } from './ticket.enums.js';
import { userDtoSchema } from '../users/user.schema.js';

const ticketShapeBase = {
    id: z.uuid(),
    sectionId: z.uuid(),
    order: z.string(),
    issueType: z.enum(ISSUE_TYPE),
    category: z.enum(CATEGORY),
    creationDate: z.iso.datetime(),
    lastUpdate: z.iso.datetime(),
    priority: z.enum(PRIORITY),
    severity: z.enum(SEVERITY),
    reproducibility: z.boolean(),
    summary: z.string(),
    description: z.string(),
};
const ticketShape = {
    ...ticketShapeBase,
    assigneeId: z.uuid().nullable(),
};
const ticketSchema = z.object(ticketShape);

const ticketDtoShape = {
    ...ticketShapeBase,
    reporter: userDtoSchema,
    assignee: userDtoSchema.nullable(),
};
const ticketDtoSchema = z.object(ticketDtoShape);
type TicketDto = z.infer<typeof ticketDtoSchema>;

export type { TicketDto }
export { ticketShape, ticketSchema, ticketDtoShape, ticketDtoSchema };
