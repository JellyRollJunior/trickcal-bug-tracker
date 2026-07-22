import { TicketDto } from './ticket.dto.js';

type Section = {
    id: string;
    boardId: string;
    order: string;
    creationDate: string;
    lastUpdate: string;
    name: string;
    tickets: TicketDto[];
};

export { Section };
