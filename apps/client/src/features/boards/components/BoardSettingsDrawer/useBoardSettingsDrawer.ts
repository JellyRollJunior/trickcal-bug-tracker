import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { usePatchBoard } from '@/features/boards/hooks/usePatchBoard.ts';
import { useAvailableNewCollaborators } from '@/features/boards/hooks/useAvailableNewCollaborators.ts';

const useBoardSettingsDrawer = (
    boardId: BoardDto['id'],
    closeModal: () => void
) => {
    const { mutate: patchBoard, isPending: isPendingPatchBoard } = usePatchBoard(boardId);
    const { data: potentialCollaborators, isPending: isPendingPotentialCollaborators } = useAvailableNewCollaborators(boardId);
    const [newBoardName, setNewBoardName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    const reset = () => {
        setNewBoardName('');
        setNewDescription('');
    };

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
        potentialCollaborators,
        isPendingPotentialCollaborators,
    };
};

export { useBoardSettingsDrawer };
