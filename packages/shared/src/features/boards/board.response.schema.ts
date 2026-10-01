import { userDtoSchema } from '../users/user.schema.js';
import {
    boardDtoSchema,
    boardWithSectionsAndTicketsDtoSchema,
} from './board.schema.js';

const getBoardsResponseSchema = boardDtoSchema.array();
const postBoardsResponseSchema = boardDtoSchema;
const getBoardResponseSchema = boardWithSectionsAndTicketsDtoSchema;
const patchBoardResponseSchema = boardDtoSchema;
const getAvailableNewCollaboratorsResponseSchema = userDtoSchema.array();
const postBoardCollaboratorResponseSchema = boardDtoSchema;
const deleteBoardCollaboratorResponseSchema = boardDtoSchema;
const deleteBoardResponseSchema = boardDtoSchema;

export {
    getBoardsResponseSchema,
    postBoardsResponseSchema,
    getBoardResponseSchema,
    patchBoardResponseSchema,
    getAvailableNewCollaboratorsResponseSchema,
    postBoardCollaboratorResponseSchema,
    deleteBoardCollaboratorResponseSchema,
    deleteBoardResponseSchema,
};
