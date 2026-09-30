import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useState, type SubmitEvent } from 'react';
import { usePatchBoard } from '@/features/boards/hooks/usePatchBoard.ts';
import { useAuth } from '@/context/auth/useAuth';

const useBoardSettingsDrawer = (
    boardId: BoardDto['id'],
    closeModal: () => void
) => {
    const { mutate: patchBoard, isPending: isPendingPatchBoard } =
        usePatchBoard(boardId);
    const { user } = useAuth();
    const [newBoardName, setNewBoardName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const reset = () => {
        setNewBoardName('');
        setNewDescription('');
    };

    const handlePatchBoard = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            name: newBoardName !== '' ? newBoardName : undefined,
            description: newDescription !== '' ? newDescription : undefined,
        };
        const hasChanges = Object.values(payload).some(
            (values) => values !== undefined
        );
        if (hasChanges) {
            patchBoard(
                {
                    boardId,
                    data: payload,
                },
                {
                    onSuccess: () => {
                        closeModal();
                        reset();
                    },
                }
            );
        }
    };

    return {
        newBoardName,
        setNewBoardName,
        newDescription,
        setNewDescription,
        reset,
        handlePatchBoard,
        isPendingPatchBoard,
        me: user,
    };
};

export { useBoardSettingsDrawer };
