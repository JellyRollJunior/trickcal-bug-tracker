import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useMutation } from '@tanstack/react-query';
import { postSections } from '@/features/sections/api/section.api.ts';

const useCreateSection = (boardId: BoardDto['id']) => {
  return useMutation({
    mutationKey: ['boards', boardId],
    mutationFn: postSections,
  });
};

export { useCreateSection }
