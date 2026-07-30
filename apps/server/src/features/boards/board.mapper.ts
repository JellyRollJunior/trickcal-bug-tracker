import type {
    BoardDto,
    BoardWithSectionsAndTicketsDto,
} from '@trickcal-bug-tracker/shared';
import type {
    BoardWithParticipants,
    BoardWithSectionsAndTickets,
} from '@/features/boards/board.select.js';
import { toSectionWithTicketsDto } from '@/features/sections/section.mapper.js';

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
    sections: board.sections.map(toSectionWithTicketsDto),
});

export { toBoardDto, toBoardWithSectionsAndTicketsDto };
