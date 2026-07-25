import { z } from 'zod';

const boardId = z.uuid();
const sectionId = z.uuid();
const ticketId = z.uuid();

const boardIdParamSchema = z.object({ boardId });
const boardIdAndSectionIdParamSchema = z.object({ boardId, sectionId });

export { boardIdParamSchema, boardIdAndSectionIdParamSchema };
