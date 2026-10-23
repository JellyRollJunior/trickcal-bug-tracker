import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postBoards } from '@/features/boards/api/boards.api.ts';
import { useNavigate } from 'react-router-dom';

const usePostBoards = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: postBoards,
        onSuccess: (board) => {
            queryClient.invalidateQueries({ queryKey: ['boards'] });
            navigate(`/boards/${board.id}`);
        },
    });
};

export { usePostBoards };
