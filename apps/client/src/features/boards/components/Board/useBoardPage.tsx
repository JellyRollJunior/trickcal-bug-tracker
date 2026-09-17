import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useState, type SubmitEvent } from 'react';
import { useBoard } from '@/features/boards/hooks/useBoard.tsx';
import { useCreateSection } from '@/features/sections/hooks/useCreateSection.tsx';

const useBoardPage = (boardId: BoardDto['id']) => {
  const {
    data: board,
    isSuccess: isSuccessGetBoard,
    isPending: isPendingGetBoard,
  } = useBoard(boardId);
  const { mutate: createSection, isPending: isPendingCreateSection } =
    useCreateSection(boardId);
  const [sectionName, setSectionName] = useState('');

  const handleCreateSection = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const lastSectionOrderId = board?.sections.at(-1)?.id;
    createSection(
      {
        boardId,
        name: sectionName,
        previousSectionId: lastSectionOrderId ?? '',
      },
      {
        onError: (error) => {
          console.log(error);
          // toast error
        },
      }
    );
  };

  return {
    board,
    isSuccessGetBoard,
    isPendingGetBoard,
    handleCreateSection,
    isPendingCreateSection,
    sectionName,
    setSectionName,
  };
};

export { useBoardPage };
