import { UserDto } from '../users/user.dto.js';
import { SectionWithTicketsDto } from '../sections/section.dto.js';

type BoardDto = {
    id: string;
    creationDate: string;
    lastUpdate: string;
    name: string;
    description: string;
    owner: UserDto;
    collaborators: UserDto[];
};

type BoardWithSectionsAndTicketsDto = BoardDto & {
    sections: SectionWithTicketsDto[];
};

export { BoardDto, BoardWithSectionsAndTicketsDto };
