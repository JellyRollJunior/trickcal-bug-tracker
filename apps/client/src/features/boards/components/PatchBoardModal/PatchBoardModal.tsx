import type { BoardDto } from '@trickcal-bug-tracker/shared';
import { Modal } from '@/common/components/Modal';
import { usePatchBoardModal } from '@/features/boards/components/PatchBoardModal/usePatchBoardModal.ts';

type PatchBoardModalProps = {
  open: boolean;
  closeModal: () => void;
  boardId: BoardDto['id'];
  boardName: BoardDto['name'];
  boardDescription: BoardDto['description'];
};
const PatchBoardModal = ({
  open,
  closeModal,
  boardId,
  boardName,
  boardDescription,
}: PatchBoardModalProps) => {
  const {
    newBoardName,
    setNewBoardName,
    newDescription,
    setNewDescription,
    reset,
    handlePatchBoard,
    isPendingPatchBoard,
  } = usePatchBoardModal(boardId, closeModal);

  return (
    <Modal open={open} closeModal={closeModal} title={'Edit Board'}>
      <form className="mt-2 h-fit px-3 py-2" onSubmit={handlePatchBoard}>
        <label htmlFor="newBoardName">Edit board name</label>
        <input
          className="block-primary w-full py-1 pr-1 pl-2"
          id="newBoardName"
          placeholder={boardName}
          minLength={1}
          maxLength={100}
          value={newBoardName}
          onChange={(event) => setNewBoardName(event.target.value)}
        />
        <label className="mt-5 block" htmlFor="newDescription">
          Edit description
        </label>
        <textarea
          className="block-primary w-full py-1 pr-1 pl-2"
          id="newDescription"
          placeholder={boardDescription}
          rows={4}
          minLength={1}
          maxLength={2000}
          value={newDescription}
          onChange={(event) => setNewDescription(event.target.value)}
        />

        <div className="mt-2 flex justify-start gap-1">
          <button
            className="button-primary px-3 py-1 disabled:bg-gray-300"
            disabled={isPendingPatchBoard}
          >
            Save changes
          </button>
          <button
            className="button-primary px-3 py-1 disabled:bg-gray-300"
            type="button"
            onClick={() => {
              closeModal();
              reset();
            }}
            disabled={isPendingPatchBoard}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export { PatchBoardModal };
