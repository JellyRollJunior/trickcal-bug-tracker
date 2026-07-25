import type { TicketDto } from '@trickcal-bug-tracker/shared';
import type { TicketWithParticipants } from '@/features/boards/select.js';

const toTicketDto = (ticket: TicketWithParticipants): TicketDto => ({
    id: ticket.id,
    sectionId: ticket.sectionId,
    order: ticket.order,
    issueType: ticket.issueType,
    category: ticket.category,
    creationDate: ticket.creationDate.toISOString(),
    lastUpdate: ticket.lastUpdate.toISOString(),
    priority: ticket.priority,
    severity: ticket.severity,
    reproducibility: ticket.reproducibility,
    summary: ticket.summary,
    description: ticket.description,
    reporter: ticket.reporter,
    assignee: ticket.assignee,
});

export { toTicketDto };
