import {
    boardAddedCollaboratorPayloadSchema,
    boardRemovedCollaboratorSchema,
    type BoardAddedCollaboratorPayload,
    type BoardRemovedCollaboratorPayload,
} from '@trickcal-bug-tracker/shared';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSocket } from '@/context/socket/useSocket.ts';
import { safeParse } from '@/lib/apiClient.ts';
import { useAuth } from '@/context/auth/useAuth.ts';
import { withSocketErrorHandling } from '@/lib/socketErrorWrapper.ts';

const useBoardsSocketSync = () => {
    const { socket, isConnected } = useSocket();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!isConnected || !socket || !user) return;

        const refetchBoards = () => {
            queryClient.invalidateQueries({ queryKey: ['boards'], exact: true });
        };

        const handleAddedCollaborator = withSocketErrorHandling(
            (payload: BoardAddedCollaboratorPayload) => {
                const parsedPayload = safeParse(
                    boardAddedCollaboratorPayloadSchema,
                    payload
                );
                if (user.id === parsedPayload.user.id) {
                    refetchBoards();
                    toast(
                        `Added as collaborator to board: ${parsedPayload.board.name}`
                    );
                }
            }
        );
        const handleRemovedCollaborator = withSocketErrorHandling(
            (payload: BoardRemovedCollaboratorPayload) => {
                const parsedPayload = safeParse(
                    boardRemovedCollaboratorSchema,
                    payload
                );
                if (user.id === parsedPayload.user.id) {
                    refetchBoards();
                    toast(
                        `Remove as collaborator to board: ${parsedPayload.board.name}`
                    );
                    navigate('/');
                }
            }
        );
        socket.on('board:added-collaborator', handleAddedCollaborator);
        socket.on('board:removed-collaborator', handleRemovedCollaborator);

        return () => {
            socket.off('board:added-collaborator', handleAddedCollaborator);
            socket.off('board:removed-collaborator', handleRemovedCollaborator);
        };
    }, [socket, isConnected, navigate, queryClient, user]);
};

export { useBoardsSocketSync };
