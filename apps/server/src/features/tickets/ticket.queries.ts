import { prisma } from '@/db/prisma.js';
import { Priority, Section, Severity, Ticket } from '@prisma/client';
import { DatabaseError } from '@trickcal-bug-tracker/shared';
import { ticketInclude } from './ticket.select.js';

const getTicketsBySection = async ({
    sectionId,
}: {
    sectionId: Section['id'];
}) => {
    try {
        const data = await prisma.ticket.findMany({
            where: { sectionId: sectionId },
            orderBy: { order: 'asc' },
            include: ticketInclude,
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
            include: ticketInclude,
        });
        return ticket;
    } catch (error) {
        throw new DatabaseError('Unable to create ticket');
    }
};

const moveTicket = async ({
    sectionId,
    ticketId,
    order,
}: {
    sectionId: Section['id'];
    ticketId: Ticket['id'];
    order: Ticket['order'];
}) => {
    try {
        const data = await prisma.ticket.update({
            where: {
                id: ticketId,
            },
            data: {
                sectionId: sectionId,
                order: order,
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to move ticket');
    }
};

export { getTicketsBySection, createTicket, moveTicket };
