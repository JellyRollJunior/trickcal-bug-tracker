import type { User } from '@prisma/client';
import { MoveTicketInput } from '@trickcal-bug-tracker/shared';
import { computeNewOrder } from '@/lib/ordering/ordering.js';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import { DatabaseError } from '@trickcal-bug-tracker/shared';
import * as ticketQueries from '@/features/tickets/ticket.queries.js';
import * as sectionQueries from '@/features/sections/section.queries.js';

const moveTicket = async ({
    userId,
    ticketId,
    sectionId,
    previousTicketId,
    nextTicketId,
}: { userId: User['id'] } & MoveTicketInput) => {
    // validate section exists
    const boardWithSection = await sectionQueries.getSection({
        sectionId,
    });
    // validate board access
    const boardId = boardWithSection?.boardId;
    if (!boardId) throw new DatabaseError();
    await assertBoardAccess({ userId, boardId });
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
