import { Modal } from '@/common/components/Modal.tsx';

type CreateTicketModalProps = {
  open: boolean;
  closeModal: () => void;
};
const CreateTicketModal = ({ open, closeModal }: CreateTicketModalProps) => {
  return (
    <Modal open={open} closeModal={closeModal} title="Create Ticket">
      <div>hi guys</div>
    </Modal>
  );
};

export { CreateTicketModal };
