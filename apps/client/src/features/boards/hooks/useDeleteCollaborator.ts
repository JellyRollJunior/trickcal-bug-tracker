import type { BoardDto } from "@trickcal-bug-tracker/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollaborator } from "@/features/boards/api/boards.api.ts";

const useDeleteCollaborator = (boardId: BoardDto['id']) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCollaborator,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards', boardId] });
            queryClient.invalidateQueries({ queryKey: ['boards', boardId, 'available-new-collaborators'] });
        },
    });
};

export { useDeleteCollaborator }