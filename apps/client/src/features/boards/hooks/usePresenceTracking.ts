import type {
    BoardDto,
    UserDto,
    SocketJoinRoomResponse,
    UserJoinedRoomPayload,
    UserLeftRoomPayload,
} from '@trickcal-bug-tracker/shared';
import {
    joinRoomOutputSchema,
    userJoinedRoomPayloadSchema,
    userLeftRoomPayloadSchema,
} from '@trickcal-bug-tracker/shared';
import { useCallback, useEffect, useState } from 'react';
import { useSocket } from '@/context/socket/useSocket.ts';
import { safeParse } from '@/lib/apiClient.ts';
import { resolveError } from '@/lib/resolveError.ts';
import { handleError } from '@/lib/errorHandler.ts';
import { withSocketErrorHandling } from '@/lib/socketErrorWrapper.ts';

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
        if (!isConnected || !socket) {
            console.error('Unable to join board room');
            return;
        }

        // board:user-joined-room
        const handleUserJoined = withSocketErrorHandling(
            (payload: UserJoinedRoomPayload) => {
                const parsedPayload = safeParse(
                    userJoinedRoomPayloadSchema,
                    payload
                );
                setViewerList(parsedPayload.viewers);
            }
        );
        socket.on('board:user-joined-room', handleUserJoined);

        // board:user-left-room
        const handleUserLeft = (payload: UserLeftRoomPayload) => {
            try {
                const parsedPayload = safeParse(
                    userLeftRoomPayloadSchema,
                    payload
                );
                setViewerList(parsedPayload.viewers);
            } catch (error) {
                handleError(error);
            }
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
