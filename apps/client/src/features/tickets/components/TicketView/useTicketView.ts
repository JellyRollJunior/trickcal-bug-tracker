import type { BoardDto, TicketDto } from '@trickcal-bug-tracker/shared';
import type { SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteTicket } from '@/features/tickets/hooks/useDeleteTicket.ts';

const useTicketView = (ticketId: TicketDto['id'], boardId: BoardDto['id']) => {
    const { mutate: deleteticket, isPending: isPendingDeleteTicket } =
        useDeleteTicket(boardId);
    const navigate = useNavigate();

    const handleDeleteTicket = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        deleteticket(
            { ticketId },
            {
                onSuccess: () => {
                    navigate(`/boards/${boardId}`);
                },
            }
        );
    };
    return { handleDeleteTicket, isPendingDeleteTicket };
};

export { useTicketView };
