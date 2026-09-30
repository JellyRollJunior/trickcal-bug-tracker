import type { UserDto } from '@trickcal-bug-tracker/shared';
import { TicketForm } from '@/features/tickets/components/TicketForm/TicketForm';
import { useTicketEditView } from './useTicketEditView';

type TicketEditViewProps = {
  collaborators: UserDto[];
  closeEditView: () => void;
  //   boardId: BoardDto['id'];
  //   sectionId: SectionDto['id'];
};
const TicketEditView = ({
  collaborators,
  closeEditView,
}: TicketEditViewProps) => {
  const { ticketFormStates, reset } = useTicketEditView()

  return (
    <TicketForm
      ticketFormStates={ticketFormStates}
      collaborators={collaborators}
      onSubmit={() => {}}
      onCancel={() => {
        reset();
        closeEditView();
      }}
      isDisabled={false}
      submitButtonText="Create ticket"
    />
  );
};

export { TicketEditView };
