import type { Board, Prisma, Ticket, User } from '@prisma/client';
import { generateKeyBetween } from 'fractional-indexing';
import { assertBoardAccess } from '@/features/boards/board.services.js';
import { NotFoundError } from '@trickcal-bug-tracker/shared';
import * as ticketQueries from '@/features/tickets/ticket.queries.js';
import * as boardQueries from '@/features/boards/board.queries.js';

const assertBoardAccessWithTicketId = async ({
    userId,
    ticketId,
}: {
    userId: User['id'];
    ticketId: Ticket['id'];
}) => {
    const ticket = await ticketQueries.getTicketWithSection({
        ticketId: ticketId,
    });
    if (!ticket) throw new NotFoundError('Ticket not found');
    await assertBoardAccess({ userId, boardId: ticket?.section.boardId ?? '' });
    return ticket;
};

const createTicket = async ({
    userId,
    boardId,
    sectionId,
    issueType,
    category,
    reproducibility,
    summary,
    description,
    priority,
    severity,
    assigneeId,
}: { userId: User['id']; boardId: Board['id'] } & Pick<
    Ticket,
    | 'sectionId'
    | 'issueType'
    | 'category'
    | 'reproducibility'
    | 'summary'
    | 'description'
> & {
        priority: Ticket['priority'];
        severity: Ticket['severity'];
        assigneeId: Ticket['assignedTo'] | null;
    }) => {
    await assertBoardAccess({ userId, boardId });
    const boardWithSection = await boardQueries.getBoardWithSectionsById({ boardId });
    if (!boardWithSection?.sections.some((section) => section.id === sectionId)) {
        throw new NotFoundError('Section corresponding sectionId not found');
    }

    // compute order
    const tickets = await ticketQueries.getTicketsBySection({ sectionId });
    const order = generateKeyBetween(tickets.at(-1)?.order ?? null, null);

    // create ticket
    const newTicket = await ticketQueries.createTicket({
        sectionId,
        order,
        issueType,
        category,
        reproducibility,
        summary,
        description,
        reporterId: userId,
        priority,
        severity,
        assigneeId,
    });
    return newTicket;
};

const updateTicket = async ({
    userId,
    ticketId,
    updates,
}: {
    userId: User['id'];
    ticketId: Ticket['id'];
    updates: Pick<
        Prisma.TicketUpdateInput,
        | 'issueType'
        | 'category'
        | 'priority'
        | 'severity'
        | 'reproducibility'
        | 'summary'
        | 'description'
    >;
}) => {
    const ticketWithSection = await assertBoardAccessWithTicketId({ userId, ticketId });

    const updatedTicket = await ticketQueries.updateTicket({ ticketId, updates });

    return { boardId: ticketWithSection.section.boardId, ticket: updatedTicket };
};

const deleteTicket = async ({
    userId,
    ticketId,
}: {
    userId: User['id'];
    ticketId: Ticket['id'];
}) => {
    const ticketWithSection = await assertBoardAccessWithTicketId({ userId, ticketId });

    const deletedTicket = await ticketQueries.deleteTicket({ ticketId });
    return { boardId: ticketWithSection.section.boardId, ticket: deletedTicket };
};

export { createTicket, updateTicket, deleteTicket };
