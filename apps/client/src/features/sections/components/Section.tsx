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
  isPendingMoveTicketId: TicketDto['id'] | null;
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
  isPendingMoveTicketId,
}: SectionProps) => {
  /* Ticket drag handlers */
  const handleTicketDragStart = (ticket: TicketDto) => {
    setActiveTicket(ticket);
    console.log(ticket.id);
  };
  const handleTicketDragEnd = () => {
    setActiveTicket(null);
    setDropTarget(null);
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

  const validateShowingTicketGhost = (
    currentTicketId: TicketDto['id'],
    currentTicketIndex: number,
    activeTicketId: TicketDto['id'] | null,
    dropTarget: DropTarget,
    sectionTickets: TicketDto[],
    position: Position
  ) => {
    if (!activeTicketId) return false;
    const isTargetMe = dropTarget?.ticketId === currentTicketId;
    const isDraggingOnSelf = dropTarget?.ticketId === activeTicketId;
    const isTargetOnMyPosition = dropTarget?.position === position;

    const isBeforeTheActiveTicketAndPostionBefore =
      currentTicketIndex > 0 &&
      sectionTickets[currentTicketIndex - 1].id === activeTicketId &&
      position === 'BEFORE';
    const isAfterTheActiveTicketAndPositionAfter =
      currentTicketIndex < sectionTickets.length - 1 &&
      sectionTickets[currentTicketIndex + 1].id === activeTicketId &&
      position === 'AFTER';
    return (
      isTargetMe &&
      !isDraggingOnSelf &&
      isTargetOnMyPosition &&
      !isBeforeTheActiveTicketAndPostionBefore &&
      !isAfterTheActiveTicketAndPositionAfter
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
      <ol className="mt-2 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
        {section.tickets.map((ticket, index) => (
          <Fragment key={ticket.id}>
            {validateShowingTicketGhost(
              ticket.id,
              index,
              activeTicket?.id ?? null,
              dropTarget,
              section.tickets,
              'BEFORE'
            ) && (
              <TicketGhost
                ticket={activeTicket}
                onDrop={() => moveTicketBefore(ticket.id, index)}
              />
            )}
            <Ticket
              ticket={ticket}
              activeTicketId={activeTicket?.id ?? null}
              onDragStart={() => handleTicketDragStart(ticket)}
              onDragEnd={handleTicketDragEnd}
              moveActiveTicketBefore={() => moveTicketBefore(ticket.id, index)}
              moveActiveTicketAfter={() => moveTicketAfter(ticket.id, index)}
              setDropTarget={setDropTarget}
              isPendingMove={ticket.id === isPendingMoveTicketId}
            />
            {validateShowingTicketGhost(
              ticket.id,
              index,
              activeTicket?.id ?? null,
              dropTarget,
              section.tickets,
              'AFTER'
            ) && (
              <TicketGhost
                ticket={activeTicket}
                onDrop={() => moveTicketAfter(ticket.id, index)}
              />
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
