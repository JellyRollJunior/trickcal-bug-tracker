import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useEffect } from 'react';
import { useBoard } from '@/features/boards/hooks/useBoard.tsx';
import { usePresenceTracking } from '@/features/boards/hooks/usePresenceTracking.ts';

const useBoardPage = (boardId: BoardDto['id']) => {
    const {
        data: board,
        isSuccess: isSuccessGetBoard,
        isPending: isPendingGetBoard,
    } = useBoard(boardId);
    const { viewerList, joinRoom } = usePresenceTracking();

    useEffect(() => {
        joinRoom(boardId);
    }, [joinRoom, boardId]);

    return {
        board,
        isSuccessGetBoard,
        isPendingGetBoard,
        viewerList,
    };
};

export { useBoardPage };
