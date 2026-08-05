import { BaseError } from '../errors/BaseError';
import { UserDto } from '../features/users';

interface SocketSucessResponse {
    success: true;
}

interface SocketFailureResponse {
    success: false;
    error: BaseError;
}

type SocketBaseResponse = SocketSucessResponse | SocketFailureResponse;
type SocketJoinRoomResponse = { success: true, viewers: UserDto[] } | SocketBaseResponse

export { SocketSucessResponse, SocketFailureResponse };
export { SocketBaseResponse, SocketJoinRoomResponse}