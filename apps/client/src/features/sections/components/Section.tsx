import add from '@/assets/icons/add_white.svg';
import settings from '@/assets/icons/settings_white.svg';

import type {
  SectionDto,
  SectionWithTicketsDto,
  TicketDto,
} from '@trickcal-bug-tracker/shared';
import { Fragment, useState, type DragEventHandler } from 'react';
import { Ticket } from '@/features/tickets/components/Ticket.tsx';

type DropAreaProps = {
  isDragging: boolean;
  onDropHandler: DragEventHandler;
  debug?: { ticketSummary: TicketDto['summary'] } | false;
};
const DropArea = ({
  isDragging,
  onDropHandler,
  debug = false,
}: DropAreaProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <li
      className="flex h-10 w-full items-center justify-center rounded border border-black bg-gray-300/50"
      style={
        debug
          ? {}
          : isVisible
            ? { opacity: 100, transition: 'all 0.2s ease-in-out' }
            : { height: 3, opacity: 0, transition: 'all 0.1s ease-in-out' }
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
      Move here {debug && debug.ticketSummary}
    </li>
  );
};

type SectionProps = {
  section: SectionWithTicketsDto;
  openCreateTicketModal: () => void;
  openSectionSettings: () => void;
  handleMoveTicket: (
    sectionId: SectionDto['id'],
    previousTicketId: TicketDto['id'] | null
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
    <section className="block-container-primary flex h-full min-h-0 w-full flex-col p-1">
      {/* Section Data & Controls */}
      <div className="block-primary-title flex justify-between gap-1 p-2">
        <h3 className="self-center">{section.name}</h3>
        <div className="grid h-fit grid-cols-2 gap-2">
          <button
            className="button-image rounded-full"
            onClick={openCreateTicketModal}
          >
            <img src={add} />
          </button>
          <button
            className="button-image rounded-full"
            onClick={openSectionSettings}
          >
            <img src={settings} />
          </button>
        </div>
      </div>

      {/* Section Data */}
      <ol className="mt-3 flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto">
        <DropArea
          isDragging={activeTicket !== null}
          onDropHandler={() => handleMoveTicket(section.id, null)}
          // debug={{ ticketSummary: 'top'}}
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
              // debug={{ ticketSummary: ticket.summary }}
            />
          </Fragment>
        ))}
      </ol>
    </section>
  );
};

export { Section };
