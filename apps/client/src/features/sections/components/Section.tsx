import type { SectionWithTicketsDto } from '@trickcal-bug-tracker/shared';
import { Ticket } from '@/features/tickets/components/Ticket.tsx';

type SectionProps = {
  section: SectionWithTicketsDto;
  openCreateTicketModal: () => void;
};
const Section = ({ section, openCreateTicketModal }: SectionProps) => {
  return (
    <div className="max-w-80 min-w-45 flex-1">
      <div className="block-primary flex justify-between gap-1 px-3 py-2">
        <h3>{section.name}</h3>
        <button
          className="rounded-full px-1 hover:bg-gray-200"
          onClick={openCreateTicketModal}
        >
          +
        </button>
      </div>
      <ol className="mt-1 flex flex-col gap-1">
        {section.tickets.map((ticket) => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
      </ol>
    </div>
  );
};

export { Section };
