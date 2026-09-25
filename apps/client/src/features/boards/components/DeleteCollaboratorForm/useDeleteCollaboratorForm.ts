import type { BoardDto, UserDto } from '@trickcal-bug-tracker/shared';
import { toast } from 'sonner';
import { useState, type SubmitEvent } from 'react';
import { useDeleteCollaborator } from '@/features/boards/hooks/useDeleteCollaborator.ts';

const useDeleteCollaboratorForm = (boardId: BoardDto['id']) => {
    const [ deleteCollaboratorId, setDeleteCollaboratorId] = useState<UserDto['id'] | ''>('');
    const { mutate: deleteCollaborator, isPending: isPendingDeleteCollaborator } = useDeleteCollaborator(boardId);

    const reset = () => setDeleteCollaboratorId('');

    const handleDeleteCollaborator = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        deleteCollaborator(
            {
                boardId,
                collaboratorId: deleteCollaboratorId,
            },
            {
                onSuccess: () => {
                    reset();
                    toast(`Collaborator removed`);
                },
            }
        );
    };

    return {
        deleteCollaboratorId,
        setDeleteCollaboratorId,
        reset,
        handleDeleteCollaborator,
        isPendingDeleteCollaborator,
    };
};

export { useDeleteCollaboratorForm };
