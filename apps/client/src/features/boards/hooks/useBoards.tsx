import { useQuery } from '@tanstack/react-query';
import { getBoards } from '@/features/boards/api/boards.api.ts';

const useBoards = () => useQuery({ queryKey: ['boards'], queryFn: getBoards });

export { useBoards };
