import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { usePatchBoard } from '@/features/boards/hooks/usePatchBoard.ts';

const useBoardSettingsDrawer = (
    boardId: BoardDto['id'],
    closeModal: () => void
) => {
    const [newBoardName, setNewBoardName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const reset = () => {
        setNewBoardName('');
        setNewDescription('');
    };
    const { mutate: patchBoard, isPending: isPendingPatchBoard } =
        usePatchBoard(boardId);

    const handlePatchBoard = () => {
        patchBoard(
            {
                boardId,
                data: {
                    name: newBoardName !== '' ? newBoardName : undefined,
                    description:
                        newDescription !== '' ? newDescription : undefined,
                },
            },
            {
                onSuccess: () => {
                    closeModal();
                    reset();
                },
            }
        );
    };

    return {
        newBoardName,
        setNewBoardName,
        newDescription,
        setNewDescription,
        reset,
        handlePatchBoard,
        isPendingPatchBoard,
    };
};

export { useBoardSettingsDrawer };
