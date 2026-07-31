import { MoveTicketInput } from '@trickcal-bug-tracker/shared';
import { computeNewOrder } from '@/lib/ordering/ordering.js';
import * as ticketQueries from '@/features/tickets/ticket.queries.js';

const moveTicket = async ({
    ticketId,
    sectionId,
    previousTicketId,
    nextTicketId,
}: MoveTicketInput) => {
    // validate section exists
    // validate board access
    // validate ticket in section
    
    // compute order
    const tickets = await ticketQueries.getTicketsBySection({ sectionId });
    const order = computeNewOrder(tickets, previousTicketId, nextTicketId);

    const ticket = await ticketQueries.moveTicket({
        ticketId,
        sectionId,
        order,
    });
    return ticket;
};

export { moveTicket };
