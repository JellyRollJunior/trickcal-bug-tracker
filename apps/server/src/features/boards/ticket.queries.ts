import { prisma } from '@/db/prisma.js';
import { Board, Priority, Section, Severity, Ticket, User } from '@prisma/client';
import { DatabaseError } from '@trickcal-bug-tracker/shared';
import { ticketInclude } from './ticket.select.js';

/* Checks if user is authorized to retrieve board */
const getTickets = async ({
    userId,
    boardId,
    sectionId,
}: {
    userId: User['id'];
    boardId: Board['id'];
    sectionId: Section['id'];
}) => {
    try {
        const data = await prisma.board.findFirst({
            where: {
                id: boardId,
                OR: [
                    { ownerId: userId },
                    { collaborators: { some: { id: userId } } },
                ],
            },
            select: {
                sections: {
                    where: {
                        id: sectionId,
                    },
                    select: {
                        tickets: {
                            include: ticketInclude,
                        },
                    },
                },
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to fetch tickets');
    }
};

const createTicket = async ({
    sectionId,
    order,
    issueType,
    category,
    reproducibility,
    summary,
    description,
    reporterId,
    priority,
    severity,
    assigneeId,
}: Pick<
    Ticket,
    | 'sectionId'
    | 'order'
    | 'issueType'
    | 'category'
    | 'reproducibility'
    | 'summary'
    | 'description'
    | 'reporterId'
> & {
    priority?: Priority;
    severity?: Severity;
    assigneeId?: Ticket['assignedTo'] | null;
}) => {
    try {
        const ticket = await prisma.ticket.create({
            data: {
                sectionId,
                order,
                issueType,
                category,
                reproducibility,
                summary,
                description,
                reporterId,
                priority: priority ?? undefined,
                severity: severity ?? undefined,
                assignedTo: assigneeId ?? undefined,
            },
        });
        return ticket;
    } catch (error) {
        throw new DatabaseError('Unable to create ticket');
    }
};

export { getTickets, createTicket };
