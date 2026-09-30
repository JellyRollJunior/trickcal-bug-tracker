import { ticketDtoSchema } from './ticket.schema.js';

const postTicketsResponseSchema = ticketDtoSchema;
const patchTicketsResponseSchema = ticketDtoSchema;
const putAssigneeResponseSchema = ticketDtoSchema;
const deleteTicketResponseSchema = ticketDtoSchema;

export {
    postTicketsResponseSchema,
    patchTicketsResponseSchema,
    putAssigneeResponseSchema,
    deleteTicketResponseSchema
};
