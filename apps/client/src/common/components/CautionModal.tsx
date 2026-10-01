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
        <p className="mt-5 text-center text-sm">{message}</p>
        <div className="mt-8 flex justify-end gap-3">
          <button
            className="button-primary px-3 py-1"
            type="button"
            onClick={closeModal}
            disabled={isSubmitDisabled}
          >
            Cancel
          </button>
          <button
            className="button-caution px-3 py-1"
            disabled={isSubmitDisabled}
          >
            {submitActionLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export { CautionModal };
