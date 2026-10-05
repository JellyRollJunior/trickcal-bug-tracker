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
        className="block-primary block px-4 py-3 hover:bg-gray-200"
        to={`/boards/${boardId}/tickets/${ticket.id}`}
        draggable={false}
      >
        <h4 className="font-semibold">{ticket.summary}</h4>
        <div className="mt-2 flex w-full justify-end gap-2">
          <div className="block-primary-label">{ticket.category}</div>
        </div>
      </Link>
    </li>
  );
};

export { Ticket };
