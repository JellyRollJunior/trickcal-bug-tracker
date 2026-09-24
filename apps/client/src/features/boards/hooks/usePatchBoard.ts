import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchBoard } from '@/features/boards/api/boards.api.ts';

const usePatchBoard = (boardId: BoardDto['id']) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchBoard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards', boardId] });
        },
    });
};

export { usePatchBoard };
