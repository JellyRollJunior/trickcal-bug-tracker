import { z } from 'zod';
import { sectionSchema } from '../features/sections';
import { UserDtoSchema } from '../features/users';
import { ticketSchema } from '../features/tickets';

// ticket:moved
const ticketMovedPayloadSchema = z.object({
    movedBy: UserDtoSchema,
    previousSectionId: sectionSchema.id,
    ticket: ticketSchema,
});
type TicketMovedPayload = z.infer<typeof ticketMovedPayloadSchema>;

export type { TicketMovedPayload };
export { ticketMovedPayloadSchema };
