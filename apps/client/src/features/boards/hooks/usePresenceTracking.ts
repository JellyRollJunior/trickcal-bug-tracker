import {
    joinRoomOutputSchema,
    type BoardDto,
    type UserDto,
} from '@trickcal-bug-tracker/shared';
import type { SocketJoinRoomResponse } from '@trickcal-bug-tracker/shared';
import { useCallback, useEffect, useState } from 'react';
import { useSocket } from '@/context/socket/useSocket.ts';
import { safeParse } from '@/lib/apiClient.ts';
import { resolveError } from '@/lib/resolveError.ts';
import { handleError } from '@/lib/errorHandler.ts';

const usePresenceTracking = (boardId: BoardDto['id']) => {
    const { socket, isConnected } = useSocket();
    const [viewerList, setViewerList] = useState<UserDto[]>([]);

    // board:join-room
    const joinRoom = useCallback(
        (boardId: BoardDto['id']) => {
            if (!socket || !isConnected) return;
            socket.emit(
                'board:join-room',
                { boardId },
                ({ success, ...response }: SocketJoinRoomResponse) => {
                    try {
                        if (success && 'viewers' in response) {
                            const parsedResponse = safeParse(
                                joinRoomOutputSchema,
                                {
                                    viewers: response.viewers,
                                }
                            );
                            setViewerList(parsedResponse.viewers);
                        } else if (!success && 'error' in response) {
                            resolveError(response.error);
                        }
                    } catch (error) {
                        handleError(error);
                    }
                }
            );
        },
        [socket, isConnected]
    );

    useEffect(() => {
        joinRoom(boardId);
    }, [joinRoom, boardId]);

    useEffect(() => {
        if (!isConnected || !socket) return;

        // board:user-joined-room
        const handleUserJoined = (payload: { viewers: UserDto[] }) => {
            setViewerList(payload.viewers);
        };
        socket.on('board:user-joined-room', handleUserJoined);

        // board:user-left-room
        const handleUserLeft = (payload: { viewers: UserDto[] }) => {
            setViewerList(payload.viewers);
        };
        socket.on('board:user-left-room', handleUserLeft);

        return () => {
            socket.off('board:user-joined-room', handleUserJoined);
            socket.off('board:user-left-room', handleUserLeft);
        };
    }, [socket, isConnected]);

    return { viewerList };
};

export { usePresenceTracking };
