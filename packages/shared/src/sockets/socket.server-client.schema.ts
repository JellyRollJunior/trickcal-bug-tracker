import { z } from 'zod';
import { sectionShape } from '../features/sections';
import { userDtoSchema } from '../features/users';
import { ticketDtoSchema } from '../features/tickets';

// ticket:moved
const ticketMovedPayloadSchema = z.object({
    movedBy: userDtoSchema,
    previousSectionId: sectionShape.id,
    ticket: ticketDtoSchema,
});
type TicketMovedPayload = z.infer<typeof ticketMovedPayloadSchema>;

export type { TicketMovedPayload };
export { ticketMovedPayloadSchema };
