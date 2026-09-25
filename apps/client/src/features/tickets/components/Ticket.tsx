import type { TicketDto } from '@trickcal-bug-tracker/shared';
import type { DragEventHandler } from 'react';

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
  return (
    <li
      className="block-primary px-3 py-2 hover:bg-gray-200"
      onDragStart={onDragStartHandler}
      onDragEnd={onDragEndHandler}
      draggable
    >
      {ticket.summary}
      <br />
    </li>
  );
};

export { Ticket };
