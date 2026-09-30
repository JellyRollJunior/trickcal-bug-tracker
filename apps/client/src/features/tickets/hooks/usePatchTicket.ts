import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchTickets } from '@/features/tickets/api/tickets.api.ts';

const usePatchTicket = (boardId: BoardDto['id']) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchTickets,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards', boardId] });
        },
    });
};

export { usePatchTicket };
