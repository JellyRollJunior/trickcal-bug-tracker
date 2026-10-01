import add from '@/assets/icons/add.svg';

import { useState } from 'react';
import { Modal } from '@/common/components/Modal.tsx';
import { useCreateBoardButton } from '@/features/boards/components/CreateBoardButton/useCreateBoardButton.ts';

const CreateBoardButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const {
    boardName,
    setBoardName,
    description,
    setDescription,
    handlePostBoard,
    isPendingCreateBoard,
  } = useCreateBoardButton(closeModal);

  return (
    <>
      {/* Add Board Button */}
      <button
        className="button-primary block-primary p-0.5"
        onClick={openModal}
      >
        <img src={add} />
      </button>

      {/* Create Board Modal */}
      {isOpen && (
        <Modal open={isOpen} closeModal={closeModal} title="Create Board">
          <form className="mt-3" onSubmit={handlePostBoard}>
            <label htmlFor="BoardName">Edit board name</label>
            <input
              className="block-primary mt-2 w-full py-1 pr-1 pl-2"
              id="BoardName"
              minLength={1}
              maxLength={100}
              value={boardName}
              onChange={(event) => setBoardName(event.target.value)}
              required={true}
            />
            <label className="mt-2 block" htmlFor="Description">
              Edit description
            </label>
            <textarea
              className="block-primary w-full py-1 pr-1 pl-2"
              id="Description"
              rows={4}
              minLength={1}
              maxLength={2000}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required={true}
            />
            <button
              className="button-primary mt-2 px-3 py-1 disabled:bg-gray-300"
              disabled={isPendingCreateBoard}
            >
              Create board
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export { CreateBoardButton };
