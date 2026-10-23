import type { PostBoardsRequestBody } from '@trickcal-bug-tracker/shared';
import { useState, type SubmitEvent } from 'react';
import { usePostBoards } from '@/features/boards/hooks/usePostBoards.ts';

const useCreateBoardForm = () => {
    const [boardName, setBoardName] = useState('');
    const [description, setDescription] = useState('');
    const { mutate: createBoard, isPending: isPendingCreateBoard } =
        usePostBoards();

    const toPostBoardsPayload = (): PostBoardsRequestBody => ({
        name: boardName,
        description: description,
    });
    const handlePostBoard = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        createBoard({ data: toPostBoardsPayload() });
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
export { useCreateBoardForm };
