import type { TicketDto } from '@trickcal-bug-tracker/shared';
import type { DragEvent, DragEventHandler } from 'react';
import { Link, useParams } from 'react-router-dom';

type TicketProps = {
  ticket: TicketDto;
  activeTicketId: TicketDto['id'] | null;
  onDragStart: DragEventHandler;
  onDragOver: DragEventHandler;
  onDragEnd: DragEventHandler;
  moveActiveTicketBefore: () => void;
  moveActiveTicketAfter: () => void;
};
const Ticket = ({
  ticket,
  activeTicketId,
  onDragStart,
  onDragOver,
  onDragEnd,
  moveActiveTicketBefore,
  moveActiveTicketAfter,
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

  return (
    <li
      onDragStart={onDragStart}
      onDragOver={onDragOver}
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
            {ticket.issueType}
          </span>
          <span className="block-primary-label ml-1">{ticket.category}</span>
        </div>
      </Link>
    </li>
  );
};

export { Ticket };
