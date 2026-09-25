import type { BoardDto } from "@trickcal-bug-tracker/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCollaborator } from "@/features/boards/api/boards.api.ts";

const usePostCollaborator = (boardId: BoardDto['id']) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postCollaborator,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['boards', boardId] });
            queryClient.invalidateQueries({ queryKey: ['boards', boardId, 'available-new-collaborators'] });
        },
    });
};

export { usePostCollaborator }