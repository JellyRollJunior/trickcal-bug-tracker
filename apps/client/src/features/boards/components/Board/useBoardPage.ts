import type { BoardDto, SectionDto } from '@trickcal-bug-tracker/shared';
import { useBoard } from '@/features/boards/hooks/useBoard.tsx';
import { useState } from 'react';

const useBoardPage = (boardId: BoardDto['id']) => {
    const {
        data: board,
        isSuccess: isSuccessGetBoard,
        isPending: isPendingGetBoard,
    } = useBoard(boardId);
    const [sectionId, setSectionId] = useState<SectionDto['id'] | null>(null);

    return {
        board,
        isSuccessGetBoard,
        isPendingGetBoard,
        sectionId,
        setSectionId,
    };
};

export { useBoardPage };
