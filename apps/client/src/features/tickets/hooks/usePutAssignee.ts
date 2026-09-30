import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putAssignee } from '@/features/tickets/api/tickets.api.ts';

const usePutAssignee = (boardId: BoardDto['id']) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: putAssignee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards', boardId] });
        },
    });
};

export { usePutAssignee };
