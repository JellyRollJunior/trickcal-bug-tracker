import add from '@/assets/icons/add.svg';
import settings from '@/assets/icons/settings.svg';

import type {
  SectionDto,
  SectionWithTicketsDto,
  TicketDto,
} from '@trickcal-bug-tracker/shared';
import { Ticket } from '@/features/tickets/components/Ticket.tsx';
import { Fragment, useState, type DragEventHandler } from 'react';

type DropAreaProps = { isDragging: boolean; onDropHandler: DragEventHandler };
const DropArea = ({ isDragging, onDropHandler }: DropAreaProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <li
      className="my-1 flex h-10 w-full items-center justify-center rounded border border-black bg-gray-300/50"
      style={
        isVisible
          ? { opacity: 100, transition: 'all 0.2s ease-in-out' }
          : { height: 5, opacity: 0, transition: 'all 0.1s ease-in-out' }
      }
      onDragEnter={() => {
        if (isDragging) setIsVisible(true);
      }}
      onDragLeave={() => setIsVisible(false)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        onDropHandler(event);
        setIsVisible(false);
      }}
    >
      Drop Area
    </li>
  );
};

type SectionProps = {
  section: SectionWithTicketsDto;
  openCreateTicketModal: () => void;
  openSectionSettings: () => void;
  handleMoveTicket: (
    sectionId: SectionDto['id'],
    prevTicketId: TicketDto['id'] | null
  ) => void;
  activeTicket: TicketDto['id'] | null;
  setActiveTicket: (ticketId: TicketDto['id'] | null) => void;
};
const Section = ({
  section,
  openCreateTicketModal,
  openSectionSettings,
  handleMoveTicket,
  activeTicket,
  setActiveTicket,
}: SectionProps) => {
  return (
    <div className="max-w-80 min-w-45 flex-1">
      {/* Section Data & Controls */}
      <div className="block-primary flex justify-between gap-1 p-2">
        <h3 className="self-center">{section.name}</h3>
        <div className="grid h-fit grid-cols-2 gap-1">
          <button
            className="button-primary rounded-full p-0.5"
            onClick={openCreateTicketModal}
          >
            <img src={add} />
          </button>
          <button
            className="button-primary rounded-full p-0.5"
            onClick={openSectionSettings}
          >
            <img src={settings} />
          </button>
        </div>
      </div>

      {/* Section Data */}
      <ol className="mt-1 flex flex-col gap-1">
        <DropArea
          isDragging={activeTicket !== null}
          onDropHandler={() => handleMoveTicket(section.id, '0')}
        />
        {section.tickets.map((ticket) => (
          <Fragment key={ticket.id}>
            <Ticket
              ticket={ticket}
              onDragStartHandler={() => setActiveTicket(ticket.id)}
              onDragEndHandler={() => setActiveTicket(null)}
            />
            <DropArea
              isDragging={activeTicket !== null}
              onDropHandler={() => handleMoveTicket(section.id, ticket.id)}
            />
          </Fragment>
        ))}
      </ol>
    </div>
  );
};

export { Section };
