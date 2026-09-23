import {
    boardDtoSchema,
    boardWithSectionsAndTicketsDtoSchema,
} from './board.schema.js';

const getBoardsResponseSchema = boardDtoSchema.array();
const getBoardResponseSchema = boardWithSectionsAndTicketsDtoSchema;
const patchBoardResponseSchema = boardDtoSchema;

export { getBoardsResponseSchema, getBoardResponseSchema, patchBoardResponseSchema };
