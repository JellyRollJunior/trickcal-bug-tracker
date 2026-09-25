import { userDtoSchema } from '../users/user.schema.js';
import {
    boardDtoSchema,
    boardWithSectionsAndTicketsDtoSchema,
} from './board.schema.js';

const getBoardsResponseSchema = boardDtoSchema.array();
const getBoardResponseSchema = boardWithSectionsAndTicketsDtoSchema;
const patchBoardResponseSchema = boardDtoSchema;
const getAvailableNewCollaboratorsResponseSchema = userDtoSchema.array();
const postBoardCollaboratorResponseSchema = boardDtoSchema;

export {
    getBoardsResponseSchema,
    getBoardResponseSchema,
    patchBoardResponseSchema,
    getAvailableNewCollaboratorsResponseSchema,
    postBoardCollaboratorResponseSchema,
};
