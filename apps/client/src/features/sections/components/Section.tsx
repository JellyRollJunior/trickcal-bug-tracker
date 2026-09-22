import add from '@/assets/icons/add.svg';
import settings from '@/assets/icons/settings.svg';

import type { SectionWithTicketsDto } from '@trickcal-bug-tracker/shared';
import { Ticket } from '@/features/tickets/components/Ticket.tsx';

type SectionProps = {
  section: SectionWithTicketsDto;
  openCreateTicketModal: () => void;
};
const Section = ({ section, openCreateTicketModal }: SectionProps) => {
  return (
    <div className="max-w-80 min-w-45 flex-1">
      <div className="block-primary flex justify-between gap-1 p-2">
        <h3>{section.name}</h3>
        <div className="grid h-fit grid-cols-2 gap-1">
          <button
            className="rounded-full hover:bg-gray-200"
            onClick={openCreateTicketModal}
          >
            <img src={add} />
          </button>
          <button className="rounded-full hover:bg-gray-200">
            <img src={settings} />
          </button>
        </div>
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
