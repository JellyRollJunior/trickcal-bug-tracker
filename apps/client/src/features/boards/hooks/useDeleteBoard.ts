import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteBoard } from '@/features/boards/api/boards.api.ts';

const useDeleteBoard = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: deleteBoard,
        onSuccess: () => {
            navigate('/boards');
            queryClient.invalidateQueries({ queryKey: ['boards'] });
        },
    });
};

export { useDeleteBoard };
