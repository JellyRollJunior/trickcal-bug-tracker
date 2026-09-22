import { z } from 'zod';
import { BaseError } from '../errors/BaseError.js';
import { userDtoSchema } from '../features/users/user.schema.js';

interface SocketSucessResponse {
    success: true;
}

interface SocketFailureResponse {
    success: false;
    error: BaseError;
}

type SocketBaseResponse = SocketSucessResponse | SocketFailureResponse;

// board:join-room
const joinRoomOutputSchema = z.object({
    viewers: userDtoSchema.array(),
});
type JoinRoomOutputSchema = z.infer<typeof joinRoomOutputSchema>;
type SocketJoinRoomResponse =
    (SocketSucessResponse & JoinRoomOutputSchema) | SocketBaseResponse;

export type { SocketSucessResponse, SocketFailureResponse };
export type { SocketBaseResponse, SocketJoinRoomResponse };
export { joinRoomOutputSchema };
