import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useQuery } from '@tanstack/react-query';
import { getBoard } from '@/features/boards/api/boards.api.ts';

const useBoard = (boardId: BoardDto['id']) =>
  useQuery({
    queryKey: ['boards', boardId],
    queryFn: () => getBoard(boardId),
  });

export { useBoard };
