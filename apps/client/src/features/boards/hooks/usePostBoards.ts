import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postBoards } from '@/features/boards/api/boards.api.ts';

const usePostBoards = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postBoards,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
        },
    });
};

export { usePostBoards };
