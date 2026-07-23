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
    assignee: { select: userSummarySelect },
    reporter: { select: userSummarySelect },
});

const sectionInclude = Prisma.validator<Prisma.SectionInclude>()({
    tickets: { select: ticketSelect, orderBy: { order: 'asc' } },
});

const boardInclude = Prisma.validator<Prisma.BoardInclude>()({
    sections: { include: sectionInclude, orderBy: { order: 'asc' } },
    collaborators: { select: userSummarySelect, orderBy: { name: 'asc' } },
});

export { ticketSelect, sectionInclude, boardInclude };
