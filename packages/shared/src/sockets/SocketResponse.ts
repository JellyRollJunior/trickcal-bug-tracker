interface SocketSucessResponse {
    success: true
}

interface SocketFailureResponse {
    success: false,
    code: number,
    message?: string,
}

type SocketBaseResponse = SocketSucessResponse | SocketFailureResponse;

export { SocketSucessResponse, SocketFailureResponse, SocketBaseResponse }