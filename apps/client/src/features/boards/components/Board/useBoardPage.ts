import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useBoard } from '@/features/boards/hooks/useBoard.tsx';

const useBoardPage = (boardId: BoardDto['id']) => {
    const {
        data: board,
        isSuccess: isSuccessGetBoard,
        isPending: isPendingGetBoard,
    } = useBoard(boardId);

    return {
        board,
        isSuccessGetBoard,
        isPendingGetBoard,
    };
};

export { useBoardPage };
