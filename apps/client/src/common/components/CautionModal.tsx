import type { SubmitEvent } from 'react';
import { Modal } from '@/common/components/Modal.tsx';
import { SpinnerButton } from '@/common/components/Spinnerbutton.tsx';

type CautionModalProps = {
  open: boolean;
  closeModal: () => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
  isSubmitDisabled: boolean;
  isLoading?: boolean;
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
  isLoading = false,
}: CautionModalProps) => {
  return (
    <Modal open={open} closeModal={closeModal} title={title}>
      <form onSubmit={onSubmit}>
        <p className="block-primary mt-2 px-5 py-8 text-center text-sm font-semibold whitespace-pre-line">
          {message}
        </p>
        <div className="mx-1 mt-2 mb-1 flex justify-end gap-3">
          <SpinnerButton
            className="button-caution"
            title={submitActionLabel}
            isDisabled={isSubmitDisabled}
            isLoading={isLoading}
          />
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
