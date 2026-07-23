import { Prisma } from '@prisma/client';
import { userSummarySelect } from '@/features/users/select.js';

const ticketSelect = Prisma.validator<Prisma.TicketSelect>()({
    id: true,
    sectionId: true,
    order: true,
    issueType: true,
    category: true,
    creationDate: true,
    lastUpdate: true,
    priority: true,
    severity: true,
    reproducibility: true,
    summary: true,
    description: true,
    reporter: { select: userSummarySelect },
    assignee: { select: userSummarySelect },
});

const sectionSelect = Prisma.validator<Prisma.SectionSelect>()({
    id: true,
    boardId: true,
    order: true,
    creationDate: true,
    lastUpdate: true,
    name: true,
    tickets: { select: ticketSelect, orderBy: { order: 'asc' } },
});

const boardSelect = Prisma.validator<Prisma.BoardSelect>()({
    id: true,
    creationDate: true,
    lastUpdate: true,
    name: true,
    description: true,
    owner: { select: userSummarySelect },
    sections: { select: sectionSelect, orderBy: { order: 'asc' } },
    collaborators: { select: userSummarySelect, orderBy: { name: 'asc' } },
});

const boardSummarySelect = Prisma.validator<Prisma.BoardSelect>()({
    id: true,
    creationDate: true,
    lastUpdate: true,
    name: true,
    description: true,
    owner: { select: userSummarySelect },
})

type BoardSummary = Prisma.BoardGetPayload<{ select: typeof boardSummarySelect }>;
type BoardSectionsTickets = Prisma.BoardGetPayload<{ select: typeof boardSelect }>;

export { ticketSelect, sectionSelect, boardSelect, boardSummarySelect };
export type { BoardSummary, BoardSectionsTickets }