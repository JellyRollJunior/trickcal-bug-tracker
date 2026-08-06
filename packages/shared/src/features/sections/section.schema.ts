import { z } from 'zod';
import { boardShape } from '../boards';
import { ticketDtoSchema } from '../tickets';

const sectionShape = {
    id: z.uuid(),
    boardId: boardShape.id,
    order: z.string(),
    creationDate: z.iso.datetime(),
    lastUpdate: z.iso.datetime(),
    name: z.string().min(1).max(26),
};

const sectionDtoSchema = z.object(sectionShape);
const sectionWithTicketsDtoSchema = sectionDtoSchema.extend({
    tickets: ticketDtoSchema.array(),
});

type SectionDto = z.infer<typeof sectionDtoSchema>;
type SectionWithTicketsDto = z.infer<typeof sectionWithTicketsDtoSchema>;

export type { SectionDto, SectionWithTicketsDto };
export { sectionShape, sectionDtoSchema, sectionWithTicketsDtoSchema };
