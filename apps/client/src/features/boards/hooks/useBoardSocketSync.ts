import {
    boardDeletedPayloadSchema,
    boardRemovedCollaboratorSchema,
    ticketMovedPayloadSchema,
    ticketUpdatedPayloadSchema,
    type BoardDeletedPayload,
    type BoardDto,
    type BoardRemovedCollaboratorPayload,
    type TicketMovedPayload,
    type TicketUpdatedPayload,
} from '@trickcal-bug-tracker/shared';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useSocket } from '@/context/socket/useSocket.ts';
import { safeParse } from '@/lib/apiClient.ts';
import { withSocketErrorHandling } from '@/lib/socketErrorWrapper.ts';
import { useMeContext } from '@/context/me/useMeContext.ts';

const useBoardSocketSync = (boardId: BoardDto['id']) => {
    const { socket, isConnected } = useSocket();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { user } = useMeContext();

    useEffect(() => {
        if (!isConnected || !socket || !user) return;

        const refetchBoards = () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
        };

        const refetchBoard = () => {
            queryClient.invalidateQueries({ queryKey: ['boards', boardId] });
        };

        // board
        const handleBoardDeleted = withSocketErrorHandling(
            (payload: BoardDeletedPayload) => {
                const parsedPayload = safeParse(
                    boardDeletedPayloadSchema,
                    payload
                );
                toast(`Board: ${parsedPayload.board.name} was deleted`);
                navigate('/boards');
                refetchBoards()
            }
        );
        const handleRemovedCollaborator = withSocketErrorHandling(
            (payload: BoardRemovedCollaboratorPayload) => {
                const parsedPayload = safeParse(
                    boardRemovedCollaboratorSchema,
                    payload
                );
                if (user.id !== parsedPayload.user.id) {
                    refetchBoard();
                }
            }
        );
        socket.on('board:edited', refetchBoard);
        socket.on('board:added-collaborator', refetchBoard);
        socket.on('board:removed-collaborator', handleRemovedCollaborator);
        socket.on('board:deleted', handleBoardDeleted);

        // section
        socket.on('section:created', refetchBoard);
        socket.on('section:edited', refetchBoard);
        socket.on('section:deleted', refetchBoard);

        // ticket
        const handleTicketUpdated = withSocketErrorHandling(
            (payload: TicketUpdatedPayload) => {
                const parsedPayload = safeParse(
                    ticketUpdatedPayloadSchema,
                    payload
                );
                toast(
                    `${parsedPayload.updatedBy.name} updated ticket: ${parsedPayload.ticket.summary}`
                );
                refetchBoard();
            }
        );
        const handleTicketMoved = withSocketErrorHandling(
            (payload: TicketMovedPayload) => {
                const parsedPayload = safeParse(
                    ticketMovedPayloadSchema,
                    payload
                );
                toast(
                    `${parsedPayload.movedBy.name} moved ticket: ${parsedPayload.ticket.summary}`
                );
                refetchBoard();
            }
        );
        socket.on('ticket:created', refetchBoard);
        socket.on('ticket:updated', handleTicketUpdated);
        socket.on('ticket:updated-assignee', refetchBoard);
        socket.on('ticket:moved', handleTicketMoved);
        socket.on('ticket:deleted', refetchBoard);

        return () => {
            // board
            socket.off('board:edited', refetchBoard);
            socket.off('board:added-collaborator', refetchBoard);
            socket.off('board:removed-collaborator', handleRemovedCollaborator);
            socket.off('board:deleted', handleBoardDeleted);

            // section
            socket.off('section:created', refetchBoard);
            socket.off('section:edited', refetchBoard);
            socket.off('section:deleted', refetchBoard);

            // ticket
            socket.off('ticket:created', refetchBoard);
            socket.off('ticket:updated', handleTicketUpdated);
            socket.off('ticket:updated-assignee', refetchBoard);
            socket.off('ticket:moved', handleTicketMoved);
            socket.off('ticket:deleted', refetchBoard);
        };
    }, [socket, isConnected, navigate, queryClient, user, boardId]);
};

export { useBoardSocketSync };
