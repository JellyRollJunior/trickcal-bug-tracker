import type { TicketDto } from '@trickcal-bug-tracker/shared';
import type { DragEventHandler } from 'react';
import { Link, useParams } from 'react-router-dom';

type TicketProps = {
  ticket: TicketDto;
  onDragStartHandler: DragEventHandler;
  onDragEndHandler: DragEventHandler;
};
const Ticket = ({
  ticket,
  onDragStartHandler,
  onDragEndHandler,
}: TicketProps) => {
  const { boardId } = useParams();
  return (
    <li onDragStart={onDragStartHandler} onDragEnd={onDragEndHandler} draggable>
      <Link
        className="block-primary block px-3 py-2 hover:bg-gray-200"
        to={`/boards/${boardId}/tickets/${ticket.id}`}
        draggable={false}
      >
        {ticket.summary}
        <br />
      </Link>
    </li>
  );
};

export { Ticket };
