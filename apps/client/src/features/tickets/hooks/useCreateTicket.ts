import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postTickets } from '@/features/tickets/api/tickets.api.ts';

const useCreateTicket = (boardId: BoardDto['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTickets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards', boardId] });
    },
  });
};

export { useCreateTicket };
