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
  const { ticketFormStates, reset, handleSubmitEditForm, isPendingSubmit } =
    useTicketEditView(boardId, ticket, closeEditView);

  return (
    <>
      <h2 className="block-primary my-2 px-4 py-3 text-xl font-bold">
        Edit Ticket
      </h2>
      <TicketForm
        ticketFormStates={ticketFormStates}
        collaborators={collaborators}
        onSubmit={handleSubmitEditForm}
        onCancel={() => {
          reset(ticket);
          closeEditView();
        }}
        isDisabled={isPendingSubmit}
        isRequired={false}
        submitButtonText="Save changes"
      />
    </>
  );
};

export { TicketEditView };
