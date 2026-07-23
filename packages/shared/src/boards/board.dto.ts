import { UserDto } from '../users/user.dto.js';
import { SectionDto } from './section.dto.js';

type BoardSummaryDto = {
    id: string;
    creationDate: Date;
    lastUpdate: Date;
    name: string;
    description: string;
    owner: UserDto;
};

type BoardDto = BoardSummaryDto & {
    sections: SectionDto[];
};

export { BoardSummaryDto, BoardDto };
