import type {
    SectionDto,
    SectionWithTicketsDto,
} from '@trickcal-bug-tracker/shared';
import type { SectionWithTickets } from '@/features/sections/section.select.js';
import { Section } from '@prisma/client';
import { toTicketDto } from '@/features/tickets/ticket.mapper.js';

const toSectionDto = (section: Section): SectionDto => ({
    id: section.id,
    boardId: section.boardId,
    order: section.order,
    name: section.name,
    creationDate: section.creationDate.toISOString(),
    lastUpdate: section.lastUpdate.toISOString(),
});

const toSectionWithTicketsDto = (
    section: SectionWithTickets
): SectionWithTicketsDto => ({
    ...toSectionDto(section),
    tickets: section.tickets.map(toTicketDto),
});

export { toSectionDto, toSectionWithTicketsDto };
