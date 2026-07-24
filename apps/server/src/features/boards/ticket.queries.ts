import { prisma } from '@/db/prisma.js';
import { Priority, Severity, Ticket } from '@prisma/client';
import { DatabaseError } from '@trickcal-bug-tracker/shared';

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

export { createTicket };
