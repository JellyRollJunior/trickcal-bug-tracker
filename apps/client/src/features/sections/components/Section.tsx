import type {
  SectionWithTicketsDto,
  TicketDto,
} from '@trickcal-bug-tracker/shared';

type SectionProps = { section: SectionWithTicketsDto };
const Section = ({ section }: SectionProps) => {
  return (
    <div className="max-w-80 min-w-40 flex-1">
      <div className="block-primary flex justify-between px-3 py-2">
        <h3>{section.name}</h3>
        <button className="rounded-full px-1 hover:bg-gray-200">+</button>
      </div>
      <ol className="mt-1 flex flex-col gap-1">
        {section.tickets.map((ticket) => (
          <Ticket key={ticket.id} ticket={ticket} />
        ))}
      </ol>
    </div>
  );
};

type TicketProps = { ticket: TicketDto };
const Ticket = ({ ticket }: TicketProps) => {
  return (
    <li className="block-primary px-3 py-2" draggable>
      {ticket.summary}
      <br />
    </li>
  );
};

export { Section };
