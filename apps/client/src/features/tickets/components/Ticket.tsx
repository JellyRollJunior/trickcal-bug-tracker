import type { DropTarget } from '@/features/boards/components/BoardContent/useBoardContent.ts';
import type { DragEvent, DragEventHandler } from 'react';
import { type TicketDto, toSentenceCase } from '@trickcal-bug-tracker/shared';
import { Link, useParams } from 'react-router-dom';

type TicketProps = {
  ticket: TicketDto;
  activeTicketId: TicketDto['id'] | null;
  onDragStart: DragEventHandler;
  onDragEnd: DragEventHandler;
  moveActiveTicketBefore: () => void;
  moveActiveTicketAfter: () => void;
  setDropTarget: (dropTarget: DropTarget) => void;
};
const Ticket = ({
  ticket,
  activeTicketId,
  onDragStart,
  onDragEnd,
  moveActiveTicketBefore,
  moveActiveTicketAfter,
  setDropTarget,
}: TicketProps) => {
  const { boardId } = useParams();

  const isCursorOnTopHalfOfItem = (event: DragEvent) => {
    // item halfway point == top + height / 2
    const item = event.currentTarget.getBoundingClientRect();
    const cursorY = event.clientY;
    const itemHalfPoint = item.top + item.height / 2;
    return cursorY <= itemHalfPoint;
  };

  const moveDraggedItem = (event: DragEvent) => {
    if (isCursorOnTopHalfOfItem(event)) {
      moveActiveTicketBefore();
    } else {
      moveActiveTicketAfter();
    }
  };

  const handleTicketDragOver = (event: DragEvent) => {
    event.preventDefault();
    if (ticket.id === activeTicketId) return;
    const position = isCursorOnTopHalfOfItem(event) ? 'BEFORE' : 'AFTER';
    setDropTarget({
      sectionId: ticket.sectionId,
      ticketId: ticket.id,
      position,
    });
  };

  return (
    <li
      onDragStart={onDragStart}
      onDragOver={handleTicketDragOver}
      onDrop={moveDraggedItem}
      onDragEnd={onDragEnd}
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
            {toSentenceCase(ticket.issueType)}
          </span>
          <span className="block-primary-label ml-1">
            {toSentenceCase(ticket.category)}
          </span>
        </div>
      </Link>
    </li>
  );
};

type TicketGhostProps = {
  ticket: TicketDto | null;
  isPointerEventsDisabled?: boolean;
  onDrop?: DragEventHandler;
};
const TicketGhost = ({
  ticket,
  onDrop,
  isPointerEventsDisabled = false,
}: TicketGhostProps) => {
  if (ticket == null) return;
  return (
    <li
      className={`block-primary block border-gray-400/50 bg-gray-300/50 px-4 py-3 opacity-60 ${isPointerEventsDisabled && 'pointer-events-none'}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop ? onDrop : () => {}}
    >
      <h4 className="font-semibold">{ticket.summary}</h4>
      <div className="mt-1 ml-auto w-fit">
        <span className="block-primary-label-secondary">
          {ticket.issueType}
        </span>
        <span className="block-primary-label ml-1">{ticket.category}</span>
      </div>
    </li>
  );
};

export { Ticket, TicketGhost };
