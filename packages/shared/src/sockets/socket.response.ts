import { BaseError } from '../errors/BaseError';

interface SocketSucessResponse {
    success: true;
}

interface SocketFailureResponse {
    success: false;
    error: BaseError;
}

type SocketBaseResponse = SocketSucessResponse | SocketFailureResponse;

export { SocketSucessResponse, SocketFailureResponse, SocketBaseResponse };
