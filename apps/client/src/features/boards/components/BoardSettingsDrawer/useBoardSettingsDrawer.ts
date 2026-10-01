import type {
    BoardDto,
    patchboardsRequestBodySchema,
} from '@trickcal-bug-tracker/shared';
import type { z } from 'zod';
import { useState, type SubmitEvent } from 'react';
import { usePatchBoard } from '@/features/boards/hooks/usePatchBoard.ts';
import { useAuth } from '@/context/auth/useAuth.ts';
import { toast } from 'sonner';

type PatchBoardPayload = z.infer<typeof patchboardsRequestBodySchema>;

const useBoardSettingsDrawer = (
    boardId: BoardDto['id'],
    boardName: BoardDto['name'],
    boardDescription: BoardDto['description'],
    boardOwnerId: BoardDto['owner']['id'],
    closeModal: () => void
) => {
    const { mutate: patchBoard, isPending: isPendingPatchBoard } =
        usePatchBoard(boardId);
    const { user: me } = useAuth();
    const [newBoardName, setNewBoardName] = useState(boardName);
    const [newDescription, setNewDescription] = useState(boardDescription);

    const isOwner = me && me.id === boardOwnerId;

    const reset = (name = boardName, description = boardDescription) => {
        setNewBoardName(name);
        setNewDescription(description);
    };

    const changed = <T>(next: T | '' | null, prev: T): T | undefined => {
        return next === '' || next === null || next === prev ? undefined : next;
    };
    const toPatchBoardPayload = (): PatchBoardPayload => ({
        name: changed(newBoardName, boardName),
        description: changed(newDescription, boardDescription),
    });
    const handlePatchBoard = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = toPatchBoardPayload();
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
                    onSuccess: (data) => {
                        closeModal();
                        reset(data.name, data.description);
                    },
                }
            );
        } else {
            toast('No changes detected');
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
        isOwner,
    };
};

export { useBoardSettingsDrawer };
