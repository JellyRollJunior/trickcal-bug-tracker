import type { BoardDto, UserDto } from '@trickcal-bug-tracker/shared';
import type { SocketJoinRoomResponse } from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { useSocket } from '@/context/socket/useSocket.ts';
import { resolveError } from '@/lib/resolveError.ts';
import { toastError } from '@/lib/toastError.ts';

const usePresenceTracking = () => {
    const { socket, isConnected } = useSocket();
    const [viewerList, setViewerList] = useState<UserDto[]>([]);

    // board:join-room
    const joinRoom = (boardId: BoardDto['id']) => {
        if (!socket || !isConnected) return;
        socket.emit(
            'board:join-room',
            { boardId },
            ({ success, ...response }: SocketJoinRoomResponse) => {
                if (success && 'viewers' in response) {
                    setViewerList(response.viewers);
                } else if (!success && 'error' in response) {
                    try {
                        resolveError(response.error);
                    } catch (error) {
                        toastError(error);
                    }
                }
            }
        );
    };

    // board:user-joined-room

    // board:user-left-room

    return { viewerList, joinRoom }
};

export { usePresenceTracking };
