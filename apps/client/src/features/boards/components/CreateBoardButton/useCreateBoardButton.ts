import type { PostBoardsRequestBody } from '@trickcal-bug-tracker/shared';
import { useState, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostBoards } from '@/features/boards/hooks/usePostBoards.ts';

const useCreateBoardButton = (closeUi: () => void) => {
    const [boardName, setBoardName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const { mutate: createBoard, isPending: isPendingCreateBoard } =
        usePostBoards();

    const toPostBoardsPayload = (): PostBoardsRequestBody => ({
        name: boardName,
        description: description,
    });
    const handlePostBoard = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        createBoard(
            { data: toPostBoardsPayload() },
            {
                onSuccess: (board) => {
                    navigate(`/boards/${board.id}`);
                    closeUi();
                },
            }
        );
    };

    return {
        boardName,
        setBoardName,
        description,
        setDescription,
        handlePostBoard,
        isPendingCreateBoard,
    };
};
export { useCreateBoardButton };
