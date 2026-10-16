import type { SectionDto, TicketDto } from '@trickcal-bug-tracker/shared';
import { useCallback, type DragEvent } from 'react';
import { Link, useParams } from 'react-router-dom';

type TicketProps = {
  ticket: TicketDto;
  previousTicketId: TicketDto['id'] | null;
  activeTicketId: TicketDto['id'] | null;
  moveTicket: (
    sectionId: SectionDto['id'],
    previousTicketId: TicketDto['id'] | null
  ) => void;
  setActiveTicket: (ticketId: TicketDto['id'] | null) => void;
};
const Ticket = ({
  ticket,
  previousTicketId,
  activeTicketId,
  moveTicket,
  setActiveTicket,
}: TicketProps) => {
  const { boardId } = useParams();

  const isCursorOnTopHalfOfItem = (event: DragEvent) => {
    // item halfway point == top + height / 2
    const item = event.currentTarget.getBoundingClientRect();
    const cursorY = event.clientY;
    const itemHalfPoint = item.top + item.height / 2;
    return cursorY <= itemHalfPoint;
  };

  const moveDraggedItem = useCallback(
    (event: DragEvent) => {
      // validate drag operation
      // is ticket dragged self below
      // is ticket dragged self above
      // is ticket dragged self+1 below
      // is ticket dragged self-1 above

      if (!activeTicketId) return;
      if (isCursorOnTopHalfOfItem(event)) {
        // prev == current + 1
        moveTicket(ticket.sectionId, previousTicketId);
        console.log(`moving ${activeTicketId} above ${ticket.summary}`);
      } else {
        // prev == current
        moveTicket(ticket.sectionId, ticket.id);
        console.log(`moving ${activeTicketId} below ${ticket.summary}`);
      }
    },
    [moveTicket, ticket, previousTicketId, activeTicketId]
  );

  const handleDragStart = () => {
    setActiveTicket(ticket.id);
    console.log(ticket.id);
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDragEnd = () => {
    setActiveTicket(null);
  };

  const handleDrop = (event: DragEvent) => {
    moveDraggedItem(event);
  };

  return (
    <li
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      draggable
      style={{
        opacity: ticket.id === activeTicketId ? 0.25 : 1,
      }}
    >
      <Link
        className="block-primary block px-4 py-3 hover:brightness-90"
        to={`/boards/${boardId}/tickets/${ticket.id}`}
        draggable={false}
      >
        <h4 className="font-semibold">{ticket.summary}</h4>
        <div className="mt-1 ml-auto w-fit">
          <span className="block-primary-label-secondary">
            {ticket.issueType}
          </span>
          <span className="block-primary-label ml-1">{ticket.category}</span>
        </div>
      </Link>
    </li>
  );
};

export { Ticket };
