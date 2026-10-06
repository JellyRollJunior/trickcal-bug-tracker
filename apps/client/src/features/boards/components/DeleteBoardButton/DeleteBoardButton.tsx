import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { useState } from 'react';
import { CautionModal } from '@/common/components/CautionModal.tsx';
import { useDeleteBoardButton } from '@/features/boards/components/DeleteBoardButton/useDeleteBoardButton.ts';

type DeleteBoardButtonProps = {
  boardId: BoardDto['id'];
};
const DeleteBoardButton = ({ boardId }: DeleteBoardButtonProps) => {
  const { handleDeleteBoard, isPendingDeleteBoard } =
    useDeleteBoardButton(boardId);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        className="button-caution w-full rounded-md py-1 text-sm"
        onClick={openModal}
        disabled={isPendingDeleteBoard}
      >
        Delete board
      </button>

      <CautionModal
        open={isOpen}
        closeModal={closeModal}
        onSubmit={handleDeleteBoard}
        isSubmitDisabled={isPendingDeleteBoard}
        title="Delete Board"
        message={`Are you sure you want to delete the board?\n All sections and tickets will also be deleted.`}
        submitActionLabel="Delete"
      />
    </>
  );
};
export { DeleteBoardButton };
