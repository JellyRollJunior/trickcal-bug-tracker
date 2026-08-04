import { z } from 'zod';
import { userDtoSchema } from '../users';
import { SectionWithTicketsDto } from '../sections';

const boardShape = {
    id: z.uuid(),
    name: z.string(),
    description: z.string(),
    creationDate: z.iso.datetime(),
    lastUpdate: z.iso.datetime(),
    owner: userDtoSchema,
    collaborators: userDtoSchema.array(),
};

const boardDtoSchema = z.object(boardShape);
type BoardDto = z.infer<typeof boardDtoSchema>

type BoardWithSectionsAndTicketsDto = BoardDto & {
    sections: SectionWithTicketsDto[];
};

export { BoardDto, BoardWithSectionsAndTicketsDto };
export { boardShape, boardDtoSchema };
