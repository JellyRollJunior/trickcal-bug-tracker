import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useBoard } from '@/features/boards/hooks/useBoard.ts';
import { usePresenceTracking } from '@/features/boards/hooks/usePresenceTracking.ts';

const useBoardPage = (boardId: BoardDto['id']) => {
    const {
        data: board,
        isSuccess: isSuccessGetBoard,
        isPending: isPendingGetBoard,
    } = useBoard(boardId);
    const { viewerList } = usePresenceTracking(boardId);

    return {
        board,
        isSuccessGetBoard,
        isPendingGetBoard,
        viewerList,
    };
};

export { useBoardPage };
