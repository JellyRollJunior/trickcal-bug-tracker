import type {
    BoardDto,
    BoardWithSectionsAndTicketsDto,
    SectionWithTicketsDto,
    TicketDto,
} from '@trickcal-bug-tracker/shared';
import type {
    BoardWithParticipants,
    BoardWithSectionsAndTickets,
    SectionWithTickets,
    TicketWithParticipants,
} from './select.js';

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

const toSectionDto = (section: SectionWithTickets): SectionWithTicketsDto => ({
    id: section.id,
    boardId: section.boardId,
    order: section.order,
    name: section.name,
    creationDate: section.creationDate.toISOString(),
    lastUpdate: section.lastUpdate.toISOString(),
    tickets: section.tickets.map(toTicketDto),
});

const toBoardDto = (board: BoardWithParticipants): BoardDto => ({
    id: board.id,
    name: board.name,
    description: board.description,
    creationDate: board.creationDate.toISOString(),
    lastUpdate: board.lastUpdate.toISOString(),
    owner: board.owner,
    collaborators: board.collaborators,
});

const toBoardWithSectionsAndTicketsDto = (
    board: BoardWithSectionsAndTickets
): BoardWithSectionsAndTicketsDto => ({
    ...toBoardDto(board),
    sections: board.sections.map(toSectionDto),
});

export {
    toTicketDto,
    toSectionDto,
    toBoardDto,
    toBoardWithSectionsAndTicketsDto,
};
