import { z } from 'zod';
import { userDtoSchema } from '../users/index.js';
import {
    sectionWithTicketsDtoSchema,
} from '../sections/index.js';

const boardShape = {
    id: z.uuid(),
    name: z.string().min(1).max(100),
    description: z.string().max(2000),
    creationDate: z.iso.datetime(),
    lastUpdate: z.iso.datetime(),
    owner: userDtoSchema,
    collaborators: userDtoSchema.array(),
};

const boardDtoSchema = z.object(boardShape);
type BoardDto = z.infer<typeof boardDtoSchema>;

const boardWithSectionsAndTicketsDtoSchema = boardDtoSchema.extend({
    sections: sectionWithTicketsDtoSchema.array(),
});
type BoardWithSectionsAndTicketsDto = z.infer<
    typeof boardWithSectionsAndTicketsDtoSchema
>;

export { BoardDto, BoardWithSectionsAndTicketsDto };
export { boardShape, boardDtoSchema, boardWithSectionsAndTicketsDtoSchema };
