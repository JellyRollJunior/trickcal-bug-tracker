import type {
  BoardDto,
  TicketDto,
  UserDto,
} from '@trickcal-bug-tracker/shared';
import { TicketForm } from '@/features/tickets/components/TicketForm/TicketForm';
import { useTicketEditView } from '@/features/tickets/components/TicketEditView/useTicketEditView.ts';

type TicketEditViewProps = {
  ticket: TicketDto;
  boardId: BoardDto['id'];
  collaborators: UserDto[];
  closeEditView: () => void;
};
const TicketEditView = ({
  ticket,
  boardId,
  collaborators,
  closeEditView,
}: TicketEditViewProps) => {
  const {
    ticketFormStates,
    reset,
    handleSubmitEditForm,
    isPendingPatchTicket,
  } = useTicketEditView(boardId, ticket, closeEditView);

  return (
    <TicketForm
      ticketFormStates={ticketFormStates}
      collaborators={collaborators}
      onSubmit={handleSubmitEditForm}
      onCancel={() => {
        reset(ticket);
        closeEditView();
      }}
      isDisabled={isPendingPatchTicket}
      isRequired={false}
      submitButtonText="Save changes"
    />
  );
};

export { TicketEditView };
