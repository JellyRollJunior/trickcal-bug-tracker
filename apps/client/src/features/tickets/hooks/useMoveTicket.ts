import {
    BaseError,
    type BoardDto,
    type BoardWithSectionsAndTicketsDto,
    type SectionDto,
    type SocketBaseResponse,
    type TicketDto,
} from '@trickcal-bug-tracker/shared';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSocket } from '@/context/socket/useSocket.ts';
import { handleError } from '@/lib/errorHandler.ts';
import { resolveError } from '@/lib/resolveError.ts';

type MoveVars = {
    ticketId: TicketDto['id'];
    sectionId: SectionDto['id'];
    boardId: BoardDto['id'];
    previousTicketId: TicketDto['id'] | null;
};

const moveTicketInBoard = (
    board: BoardWithSectionsAndTicketsDto,
    { ticketId, sectionId, previousTicketId }: MoveVars
): BoardWithSectionsAndTicketsDto => {
    const ticket = board.sections
        .flatMap((s) => s.tickets)
        .find((t) => t.id === ticketId);
    if (!ticket) return board;

    const sections = board.sections.map((s) => {
        const tickets = s.tickets.filter((t) => t.id !== ticketId);
        if (s.id !== sectionId) return { ...s, tickets };

        const index =
            previousTicketId === null
                ? -1
                : tickets.findIndex((t) => t.id === previousTicketId);
        tickets.splice(index + 1, 0, { ...ticket, sectionId });
        return { ...s, tickets };
    });

    return { ...board, sections };
};

const useMoveTicket = () => {
    const { socket, isConnected } = useSocket();
    const queryClient = useQueryClient();
    const canMove = isConnected && !!socket;

    const mutation = useMutation({
        mutationKey: ['moveTicket'],

        mutationFn: ({ ticketId, sectionId, previousTicketId }: MoveVars) =>
            new Promise<void>((resolve, reject) => {
                if (!socket) return reject(new BaseError('Socket unavailable'));
                socket
                    .timeout(6000)
                    .emit(
                        'ticket:move',
                        { ticketId, sectionId, previousTicketId },
                        (error: Error | null, response: SocketBaseResponse) => {
                            if (error) {
                                return reject(new BaseError('Request Timeout', 'Ticket move request timeout'));
                            }
                            if (!response.success) {
                                return reject(response.error ?? new BaseError('Internal Server Error', 'Unable to move ticket'));
                            }
                            resolve();
                        }
                    );
            }),

        onMutate: async (vars) => {
            const queryKey = ['boards', vars.boardId];
            // stop in-flight refetches from overwriting the optimistic state
            await queryClient.cancelQueries({ queryKey });
            queryClient.setQueryData<BoardWithSectionsAndTicketsDto>(
                queryKey,
                (old) => (old ? moveTicketInBoard(old, vars) : old)
            );
        },

        onError: (error) => {
            try {
                resolveError(error);
            } catch (error) {
                handleError(error);
            }
        },

        onSettled: (_data, _error, vars) => {
            // Only refetch on last in-flight move, else could invalidate optimistic moves
            if (queryClient.isMutating({ mutationKey: ['moveTicket'] }) === 1) {
                queryClient.invalidateQueries({ queryKey: ['boards', vars.boardId] });
            }
        },
    });

    const moveTicket = useCallback(
        (
            ticketId: TicketDto['id'],
            sectionId: SectionDto['id'],
            boardId: BoardDto['id'],
            previousTicketId: TicketDto['id'] | null
        ) => {
            if (!isConnected || !socket) {
                toast.error('Unable to move ticket');
                return;
            }
            mutation.mutate({ ticketId, sectionId, boardId, previousTicketId });
        },
        [socket, isConnected, mutation]
    );

    return { canMove, moveTicket };
};

export { useMoveTicket };
