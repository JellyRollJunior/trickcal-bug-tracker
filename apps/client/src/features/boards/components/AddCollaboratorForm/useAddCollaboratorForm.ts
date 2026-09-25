import type { BoardDto, UserDto } from '@trickcal-bug-tracker/shared';
import { useState, type SubmitEvent } from 'react';
import { useAvailableNewCollaborators } from '@/features/boards/hooks/useAvailableNewCollaborators.ts';
import { usePostCollaborator } from '@/features/boards/hooks/usePostCollaborator.ts';
import { toast } from 'sonner';

const useAddCollaboratorForm = (boardId: BoardDto['id']) => {
    const {
        data: potentialCollaborators,
        isPending: isPendingPotentialCollaborators,
    } = useAvailableNewCollaborators(boardId);
    const { mutate: postCollaborator, isPending: isPendingPostCollaborator } = usePostCollaborator(boardId);
    const [newCollaboratorId, setNewcollaboratorId] = useState<UserDto['id'] | ''>('');

    const reset = () => {
        setNewcollaboratorId('');
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
        reset,
        potentialCollaborators,
        isPendingPotentialCollaborators,
        newCollaboratorId,
        setNewcollaboratorId,
        handlePostCollaborator,
        isPendingPostCollaborator,
    };
};

export { useAddCollaboratorForm };
