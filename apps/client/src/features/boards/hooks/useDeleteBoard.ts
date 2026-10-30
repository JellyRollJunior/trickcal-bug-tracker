import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBoard } from '@/features/boards/api/boards.api.ts';

const useDeleteBoard = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteBoard,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
            toast(`${data.name} has been deleted`);
        },
    });
};

export { useDeleteBoard };
