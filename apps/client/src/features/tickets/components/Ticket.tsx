import type { TicketDto } from '@trickcal-bug-tracker/shared';

type TicketProps = { ticket: TicketDto };
const Ticket = ({ ticket }: TicketProps) => {
  return (
    <li className="block-primary px-3 py-2 hover:bg-gray-200" draggable>
      {ticket.summary}
      <br />
    </li>
  );
};

export { Ticket };
