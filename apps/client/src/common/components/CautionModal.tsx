import type { SubmitEvent } from 'react';
import { Modal } from '@/common/components/Modal.tsx';

type CautionModalProps = {
  open: boolean;
  closeModal: () => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  isSubmitDisabled: boolean;
  title: string;
  message: string;
  submitActionLabel: string;
};
const CautionModal = ({
  open,
  closeModal,
  onSubmit,
  isSubmitDisabled,
  title,
  message,
  submitActionLabel,
}: CautionModalProps) => {
  return (
    <Modal open={open} closeModal={closeModal} title={title}>
      <form onSubmit={onSubmit}>
        <p className="block-primary mt-2 px-3 py-2 text-center text-sm whitespace-pre-line">
          {message}
        </p>
        <div className="mx-1 mt-2 mb-1 flex justify-end gap-3">
          <button
            className="button-caution button-text-base"
            disabled={isSubmitDisabled}
          >
            {submitActionLabel}
          </button>
          <button
            className="button-back"
            type="button"
            onClick={closeModal}
            disabled={isSubmitDisabled}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export { CautionModal };
