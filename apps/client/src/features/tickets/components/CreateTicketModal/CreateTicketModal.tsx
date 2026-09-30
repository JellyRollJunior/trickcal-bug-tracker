import type {
  BoardDto,
  SectionDto,
  UserDto,
} from '@trickcal-bug-tracker/shared';
import { useCreateTicketForm } from '@/features/tickets/components/CreateTicketModal/useCreateTicketForm.ts';
import { Modal } from '@/common/components/Modal.tsx';
import { TicketForm } from '@/features/tickets/components/TicketForm/TicketForm.tsx';

type CreateTicketModalProps = {
  open: boolean;
  closeModal: () => void;
  boardId: BoardDto['id'];
  sectionId: SectionDto['id'];
  collaborators: UserDto[];
};
const CreateTicketModal = ({
  open,
  closeModal,
  boardId,
  sectionId,
  collaborators,
}: CreateTicketModalProps) => {
  const { ticketFormStates, reset, handleCreateTicket, isPendingCreateTicket } =
    useCreateTicketForm(boardId, sectionId, closeModal);

  return (
    <Modal open={open} closeModal={closeModal} title="Create Ticket">
      <TicketForm
        ticketFormStates={ticketFormStates}
        collaborators={collaborators}
        onSubmit={handleCreateTicket}
        onCancel={() => {
          reset();
          closeModal();
        }}
        isDisabled={isPendingCreateTicket}
        submitButtonText="Create ticket"
      />
    </Modal>
  );
};

export { CreateTicketModal };
