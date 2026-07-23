import { UserDto } from '../users/user.dto.js';
import { SectionDto } from './section.dto.js';

type BoardSummaryDto = {
    id: string;
    creationDate: string;
    lastUpdate: string;
    name: string;
    description: string;
    owner: UserDto;
};

type BoardDto = BoardSummaryDto & {
    sections: SectionDto[];
};

export { BoardSummaryDto, BoardDto };
