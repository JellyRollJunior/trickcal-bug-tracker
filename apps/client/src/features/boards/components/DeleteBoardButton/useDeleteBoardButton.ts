import type { SubmitEvent } from 'react';
import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useNavigate } from 'react-router-dom';
import { useDeleteBoard } from '@/features/boards/hooks/useDeleteBoard.ts';

const useDeleteBoardButton = (boardId: BoardDto['id']) => {
    const { mutate: deleteBoard, isPending: isPendingDeleteBoard } =
        useDeleteBoard();
    const navigate = useNavigate();

    const handleDeleteBoard = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate('/boards');
        deleteBoard({ boardId });
    };

    return { handleDeleteBoard, isPendingDeleteBoard };
};
export { useDeleteBoardButton };
