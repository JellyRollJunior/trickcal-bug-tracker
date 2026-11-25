import type { BoardDto } from '@trickcal-bug-tracker/shared';
import type { BoardOutletContext } from '../../context/useBoardOutletContext';
import { useBoard } from '@/features/boards/hooks/useBoard.ts';
import { usePresenceTracking } from '@/features/boards/hooks/usePresenceTracking.ts';
import { useBoardSocketSync } from '@/features/boards/hooks/useBoardSocketSync.ts';
import { useState } from 'react';

const useBoardDataLayer = (boardId: BoardDto['id']): BoardOutletContext => {
    const {
        data: board,
        isPending: isPendingGetBoard,
        isError: isErrorGetBoard,
    } = useBoard(boardId);
    const { viewerList } = usePresenceTracking(boardId);

    // board details
    const [isDetailsOpen, setIsDetailsOpen] = useState(true);
    const toggleDetails = () => setIsDetailsOpen((prev) => !prev);

    useBoardSocketSync(boardId);

    return {
        board: board ?? null,
        isPendingGetBoard,
        isErrorGetBoard,
        viewerList,
        isDetailsOpen,
        toggleDetails,
    };
};

export { useBoardDataLayer };
