import add from '@/assets/icons/add_white.svg';
import settings from '@/assets/icons/settings_white.svg';

import type {
  SectionDto,
  SectionWithTicketsDto,
  TicketDto,
} from '@trickcal-bug-tracker/shared';
import type {
  DropTarget,
  Position,
} from '@/features/boards/components/BoardContent/useBoardContent.ts';
import { Fragment, type DragEvent } from 'react';
import { Ticket, TicketGhost } from '@/features/tickets/components/Ticket.tsx';
import { EmptySectionDropArea } from '@/features/sections/components/EmptySectionDropArea.tsx';

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
  activeTicket: TicketDto | null;
  setActiveTicket: (ticketId: TicketDto | null) => void;
  dropTarget: DropTarget;
  setDropTarget: (dropTarget: DropTarget) => void;
};
const Section = ({
  section,
  openCreateTicketModal,
  openSectionSettings,
  handleMoveTicket,
  activeTicket,
  setActiveTicket,
  dropTarget,
  setDropTarget,
}: SectionProps) => {
  /* Ticket drag handlers */
  const handleTicketDragStart = (ticket: TicketDto) => {
    setActiveTicket(ticket);
    console.log(ticket.id);
  };
  const handleTicketDragEnd = () => {
    setActiveTicket(null);
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

  /* Empty section drag handlers */
  const handleEmptySectionDragOver = (
    event: DragEvent,
    sectionId: SectionDto['id']
  ) => {
    event.preventDefault();
    if (dropTarget?.sectionId === sectionId && dropTarget.ticketId === null) {
      return;
    }
    setDropTarget({ sectionId, ticketId: null, position: 'BEFORE' });
  };
  const handleEmptySectionDrop = () => {
    handleMoveTicket(section, null, null, 'BEFORE');
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
      <ol className="mt-3 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
        {section.tickets.map((ticket, index) => (
          <Fragment key={ticket.id}>
            {activeTicket?.id !== ticket.id &&
              dropTarget?.ticketId === ticket.id &&
              dropTarget.position === 'BEFORE' && (
                <TicketGhost ticket={activeTicket} />
              )}
            <Ticket
              ticket={ticket}
              activeTicketId={activeTicket?.id ?? null}
              onDragStart={() => handleTicketDragStart(ticket)}
              onDragEnd={handleTicketDragEnd}
              moveActiveTicketBefore={() => moveTicketBefore(ticket.id, index)}
              moveActiveTicketAfter={() => moveTicketAfter(ticket.id, index)}
              setDropTarget={setDropTarget}
            />
            {activeTicket?.id !== ticket.id &&
              dropTarget?.ticketId === ticket.id &&
              dropTarget.position === 'AFTER' && (
                <TicketGhost ticket={activeTicket} />
              )}
          </Fragment>
        ))}
        {section.tickets.length === 0 && (
          <EmptySectionDropArea
            key={section.id}
            isDragging={activeTicket !== null}
            onDragOver={(e) => handleEmptySectionDragOver(e, section.id)}
            onDrop={handleEmptySectionDrop}
            ticket={activeTicket}
          />
        )}
      </ol>
    </section>
  );
};

export { Section };
