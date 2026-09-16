import type {
  BoardDto,
  SectionWithTicketsDto,
  TicketDto,
} from '@trickcal-bug-tracker/shared';
import { useParams } from 'react-router-dom';
import { useBoard } from '@/features/boards/hooks/useBoard.tsx';

type BoardProps = { boardId: BoardDto['id'] };

const BoardContainer = () => {
  const { boardId } = useParams();

  if (!boardId) return <h3> swag </h3>;

  return <Board boardId={boardId} />;
};

const Board = ({ boardId }: BoardProps) => {
  const { data: board, isSuccess, isPending } = useBoard(boardId);

  return (
    <div className='flex flex-col gap-2 mt-3'>
      {board && isSuccess && !isPending && (
        <>
          <h2 className='block-primary px-3 py-2 w-fit'>{board.name}</h2>
          <h3 className='block-primary px-3 py-2 w-fit '>{board.description}</h3>
          <ol className="flex max-w-screen gap-3 pb-5 overflow-x-scroll">
            {board.sections.map((section) => (
              <Section key={section.id} section={section} />
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

type SectionProps = { section: SectionWithTicketsDto };
const Section = ({ section }: SectionProps) => {
  return (
    <div className="w-40 shrink-0 ">
      <h3 className="block-primary py-2 px-3">
        {section.name}
      </h3>
      <ol className="flex flex-col gap-2">
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
    <li className="block-primary px-3 py-2">
      {ticket.summary}
      {ticket.description}
    </li>
  );
};

export { BoardContainer as Board };
