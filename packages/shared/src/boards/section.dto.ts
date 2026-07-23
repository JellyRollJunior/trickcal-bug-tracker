import { TicketDto } from './ticket.dto.js';

type SectionDto = {
    id: string;
    boardId: string;
    order: string;
    creationDate: Date;
    lastUpdate: Date;
    name: string;
    tickets: TicketDto[];
};

export { SectionDto };
