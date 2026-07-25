import { Prisma } from '@prisma/client';
import { ticketInclude } from '@/features/boards/ticket.select.js';

const sectionInclude = Prisma.validator<Prisma.SectionInclude>()({
    tickets: { include: ticketInclude, orderBy: { order: 'asc' } },
});

type SectionWithTickets = Prisma.SectionGetPayload<{
    include: typeof sectionInclude;
}>;

export { sectionInclude };
export type { SectionWithTickets };
