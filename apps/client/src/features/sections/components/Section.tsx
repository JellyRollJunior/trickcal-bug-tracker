import add from '@/assets/icons/add_white.svg';
import settings from '@/assets/icons/settings_white.svg';

import type {
  SectionWithTicketsDto,
  TicketDto,
} from '@trickcal-bug-tracker/shared';
import type {
  DropTarget,
  Position,
} from '@/features/boards/components/BoardContent/useBoardContent.ts';
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
      className="flex h-full w-full flex-1 items-center justify-center rounded border border-black bg-gray-300/50"
      style={
        debug
          ? {}
          : isVisible
            ? { opacity: 70, transition: 'all 0.2s ease-in-out' }
            : { opacity: 0, transition: 'all 0.1s ease-in-out' }
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

const TicketGhost = () => {
  return (
    <div className="flex h-fit w-full items-center justify-center rounded border border-gray-400/50 bg-gray-300/50 px-2 py-1">
      Move here
    </div>
  );
};

type SectionProps = {
  section: SectionWithTicketsDto;
  openCreateTicketModal: () => void;
  openSectionSettings: () => void;
  handleMoveTicket: (
    toSection: SectionWithTicketsDto,
    targetTicketId: TicketDto['id'] | null,
    beforeTargetTicketId: TicketDto['id'] | null,
    position: Position
  ) => void;
  activeTicketId: TicketDto['id'] | null;
  setActiveTicketId: (ticketId: TicketDto['id'] | null) => void;
  dropTarget: DropTarget;
  setDropTarget: (dropTarget: DropTarget) => void;
};
const Section = ({
  section,
  openCreateTicketModal,
  openSectionSettings,
  handleMoveTicket,
  activeTicketId,
  setActiveTicketId,
  dropTarget,
  setDropTarget,
}: SectionProps) => {
  const handleTicketDragStart = (ticketId: TicketDto['id']) => {
    setActiveTicketId(ticketId);
    console.log(ticketId);
  };

  const handleTicketDragEnd = () => {
    setActiveTicketId(null);
    setDropTarget(null);
    console.log('drag end');
  };

  const moveTicketBefore = (ticketId: TicketDto['id'], ticketIndex: number) => {
    handleMoveTicket(
      section,
      ticketId,
      ticketIndex === 0 ? null : section.tickets[ticketIndex - 1].id,
      'BEFORE'
    );
  };

  const moveTicketAfter = (ticketId: TicketDto['id'], ticketIndex: number) => {
    handleMoveTicket(
      section,
      ticketId,
      ticketIndex === 0 ? null : section.tickets[ticketIndex - 1].id,
      'AFTER'
    );
  };

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
        {section.tickets.map((ticket, index) => (
          <Fragment key={ticket.id}>
            {dropTarget?.ticketId === ticket.id &&
              dropTarget.position === 'BEFORE' && <TicketGhost />}
            <Ticket
              ticket={ticket}
              activeTicketId={activeTicketId}
              onDragStart={() => handleTicketDragStart(ticket.id)}
              onDragEnd={handleTicketDragEnd}
              moveActiveTicketBefore={() => moveTicketBefore(ticket.id, index)}
              moveActiveTicketAfter={() => moveTicketAfter(ticket.id, index)}
              setDropTarget={setDropTarget}
            />
            {dropTarget?.ticketId === ticket.id &&
              dropTarget.position === 'AFTER' && <TicketGhost />}
          </Fragment>
        ))}
        {section.tickets.length === 0 && (
          <DropArea
            isDragging={activeTicketId !== null}
            onDropHandler={() =>
              handleMoveTicket(section, null, null, 'BEFORE')
            }
          />
        )}
      </ol>
    </section>
  );
};

export { Section };
