import {
    boardDtoSchema,
    boardWithSectionsAndTicketsDtoSchema,
} from './board.schema.js';

const getBoardsResponseSchema = boardDtoSchema.array();
const getBoardResponseSchema = boardWithSectionsAndTicketsDtoSchema;

export { getBoardsResponseSchema, getBoardResponseSchema };
