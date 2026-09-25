import { useQuery } from '@tanstack/react-query';
import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { getAvailableNewCollaborators } from '@/features/boards/api/boards.api.ts';

const useAvailableNewCollaborators = (boardId: BoardDto['id']) => {
    return useQuery({
        queryKey: ['boards', boardId, 'available-new-collaborators'],
        queryFn: () => getAvailableNewCollaborators({ boardId }),
    });
};

export { useAvailableNewCollaborators };
