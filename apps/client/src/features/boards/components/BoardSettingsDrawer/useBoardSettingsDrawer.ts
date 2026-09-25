import type { BoardDto, UserDto } from '@trickcal-bug-tracker/shared';
import { useState, type SubmitEvent } from 'react';
import { usePatchBoard } from '@/features/boards/hooks/usePatchBoard.ts';
import { useAvailableNewCollaborators } from '@/features/boards/hooks/useAvailableNewCollaborators.ts';
import { usePostCollaborator } from '@/features/boards/hooks/usePostCollaborator.ts';
import { toast } from 'sonner';

const useBoardSettingsDrawer = (
    boardId: BoardDto['id'],
    closeModal: () => void
) => {
    const { mutate: patchBoard, isPending: isPendingPatchBoard } =
        usePatchBoard(boardId);
    const { mutate: postCollaborator, isPending: isPendingPostCollaborator } =
        usePostCollaborator(boardId);
    const {
        data: potentialCollaborators,
        isPending: isPendingPotentialCollaborators,
    } = useAvailableNewCollaborators(boardId);
    const [newBoardName, setNewBoardName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newCollaboratorId, setNewcollaboratorId] = useState<
        UserDto['id'] | ''
    >('');

    const reset = () => {
        setNewBoardName('');
        setNewDescription('');
        setNewcollaboratorId('');
    };

    const handlePatchBoard = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
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

    const handlePostCollaborator = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        postCollaborator(
            {
                boardId,
                data: {
                    collaboratorId: newCollaboratorId,
                },
            },
            {
                onSuccess: (data, args) => {
                    reset();
                    toast(
                        `${data.collaborators.find((user) => user.id === args.data.collaboratorId)?.name} added as collaborator`
                    );
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
        newCollaboratorId,
        setNewcollaboratorId,
        handlePostCollaborator,
        isPendingPostCollaborator,
    };
};

export { useBoardSettingsDrawer };
