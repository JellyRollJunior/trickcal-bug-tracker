import type {
    BoardDto,
    SectionDto,
    SocketBaseResponse,
    TicketDto,
} from '@trickcal-bug-tracker/shared';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useSocket } from '@/context/socket/useSocket.ts';
import { handleError } from '@/lib/errorHandler.ts';
import { resolveError } from '@/lib/resolveError.ts';

const useMoveTicket = () => {
    const { socket, isConnected } = useSocket();
    const queryClient = useQueryClient();
    const [isPending, setIsPending] = useState<TicketDto['id'] | null>(null);

    const moveTicket = useCallback(
        (
            ticketId: TicketDto['id'],
            sectionId: SectionDto['id'],
            boardId: BoardDto['id'],
            previousTicketId: TicketDto['id'] | null,
        ) => {
            if (!isConnected || !socket) return;
            
            setIsPending(ticketId);
            socket.emit(
                'ticket:move',
                { ticketId, sectionId, previousTicketId },
                (response: SocketBaseResponse) => {
                    setIsPending(null);
                    try {
                        if (!response.success && response.error) {
                            resolveError(response.error);
                            return;
                        }
                        toast(`ticket: ${ticketId} moved to section: ${sectionId}`);
                        queryClient.invalidateQueries({ queryKey: ['boards', boardId] });
                    } catch (error) {
                        console.log('rollback')
                        queryClient.invalidateQueries({ queryKey: ['boards', boardId] });
                        handleError(error);
                    }
                }
            );
        },
        [socket, isConnected, queryClient]
    );

    return { moveTicket, isPending }
};

export { useMoveTicket }