import add from '@/assets/icons/add_white.svg';

import { useState } from 'react';
import { Modal } from '@/common/components/Modal.tsx';
import { CreateBoardForm } from '@/features/boards/components/CreateBoardForm/CreateBoardForm.tsx';

const CreateBoardButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Add Board Button */}
      <button
        className="button-image rounded-full"
        onClick={openModal}
        aria-label="Create board"
      >
        <img src={add} />
      </button>

      {/* Create Board Modal */}
      {isOpen && (
        <Modal open={isOpen} closeModal={closeModal} title="Create Board">
          <CreateBoardForm onSubmitCleanup={closeModal} />
        </Modal>
      )}
    </>
  );
};

export { CreateBoardButton };
