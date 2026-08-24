import { prisma } from '@/db/prisma.js';
import { Priority, Section, Severity, Ticket } from '@prisma/client';
import { DatabaseError } from '@trickcal-bug-tracker/shared';
import {
    ticketInclude,
    TicketWithParticipants,
} from '@/features/tickets/ticket.select.js';

const getTicketWithSection = async ({
    ticketId,
}: {
    ticketId: Ticket['id'];
}) => {
    try {
        const data = await prisma.ticket.findFirst({
            where: {
                id: ticketId,
            },
            include: {
                section: true,
            },
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to fetch ticket');
    }
};

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
    ticketId,
    sectionId,
    order,
}: {
    ticketId: Ticket['id'];
    sectionId: Section['id'];
    order: Ticket['order'];
}): Promise<TicketWithParticipants> => {
    try {
        const data = await prisma.ticket.update({
            where: {
                id: ticketId,
            },
            data: {
                sectionId: sectionId,
                order: order,
            },
            include: ticketInclude,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to move ticket');
    }
};

const deleteTicket = async ({ ticketId }: { ticketId: Ticket['id'] }) => {
    try {
        const data = await prisma.ticket.delete({
            where: {
                id: ticketId,
            },
            include: ticketInclude,
        });
        return data;
    } catch (error) {
        throw new DatabaseError('Unable to delete ticket');
    }
};

export {
    getTicketWithSection,
    getTicketsBySection,
    createTicket,
    moveTicket,
    deleteTicket,
};
