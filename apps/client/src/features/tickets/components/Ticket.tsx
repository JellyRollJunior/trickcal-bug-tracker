import type { TicketDto } from '@trickcal-bug-tracker/shared';
import type { DragEventHandler } from 'react';
import { Link, useParams } from 'react-router-dom';

type TicketProps = {
  ticket: TicketDto;
  activeTicketId: TicketDto['id'] | null;
  onDragStartHandler: DragEventHandler;
  onDragEndHandler: DragEventHandler;
};
const Ticket = ({
  ticket,
  activeTicketId,
  onDragStartHandler,
  onDragEndHandler,
}: TicketProps) => {
  const { boardId } = useParams();

  return (
    <li
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
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
