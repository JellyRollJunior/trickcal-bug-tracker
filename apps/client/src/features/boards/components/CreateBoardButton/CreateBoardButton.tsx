import add from '@/assets/icons/add_white.svg';

import { useState } from 'react';
import { Modal } from '@/common/components/Modal.tsx';
import { useCreateBoardButton } from '@/features/boards/components/CreateBoardButton/useCreateBoardButton.ts';
import { SpinnerButton } from '@/common/components/Spinnerbutton';

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
      <button className="button-image rounded-full" onClick={openModal}>
        <img src={add} />
      </button>

      {/* Create Board Modal */}
      {isOpen && (
        <Modal open={isOpen} closeModal={closeModal} title="Create Board">
          <form
            className="block-primary mt-2 px-3 py-2"
            onSubmit={handlePostBoard}
          >
            <label className="font-semibold" htmlFor="BoardName">
              Board name
            </label>
            <input
              className="input"
              id="BoardName"
              minLength={1}
              maxLength={100}
              value={boardName}
              onChange={(event) => setBoardName(event.target.value)}
              required={true}
            />
            <label className="mt-2 block font-semibold" htmlFor="Description">
              Description
            </label>
            <textarea
              className="input"
              id="Description"
              rows={4}
              minLength={1}
              maxLength={2000}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required={true}
            />
            <SpinnerButton
              className="button-confirm mt-2 ml-auto block"
              title="Create board"
              isDisabled={isPendingCreateBoard}
              isLoading={isPendingCreateBoard}
            />
          </form>
        </Modal>
      )}
    </>
  );
};

export { CreateBoardButton };
