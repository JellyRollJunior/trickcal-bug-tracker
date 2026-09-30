import type {
  BoardDto,
  TicketDto,
  UserDto,
} from '@trickcal-bug-tracker/shared';
import { TicketForm } from '@/features/tickets/components/TicketForm/TicketForm';
import { useTicketEditView } from './useTicketEditView';

type TicketEditViewProps = {
  ticketId: TicketDto['id'];
  boardId: BoardDto['id'];
  collaborators: UserDto[];
  closeEditView: () => void;
};
const TicketEditView = ({
  ticketId,
  boardId,
  collaborators,
  closeEditView,
}: TicketEditViewProps) => {
  const {
    ticketFormStates,
    reset,
    handleSubmitEditForm,
    isPendingPatchTicket,
  } = useTicketEditView(boardId, ticketId, closeEditView);

  return (
    <TicketForm
      ticketFormStates={ticketFormStates}
      collaborators={collaborators}
      onSubmit={handleSubmitEditForm}
      onCancel={() => {
        reset();
        closeEditView();
      }}
      isDisabled={isPendingPatchTicket}
      isRequired={false}
      submitButtonText="Save changes"
    />
  );
};

export { TicketEditView };
