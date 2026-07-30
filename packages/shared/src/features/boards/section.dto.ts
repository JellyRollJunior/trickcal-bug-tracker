import { TicketDto } from './ticket.dto.js';

type SectionDto = {
    id: string;
    boardId: string;
    order: string;
    creationDate: string;
    lastUpdate: string;
    name: string;
};

type SectionWithTicketsDto = SectionDto & {
    tickets: TicketDto[];
};

export { SectionDto, SectionWithTicketsDto };
