import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTicket } from '@/features/tickets/api/tickets.api.ts';

const useDeleteTicket = (boardId: BoardDto['id']) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTicket,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards', boardId] });
        },
    });
};

export { useDeleteTicket };
